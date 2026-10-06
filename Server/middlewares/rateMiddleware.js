const IP = require("../models/IP/IPModel");
const { StatusCodes } = require("http-status-codes");
const {
  server_error,
  maximum_request_limit,
  excess_request,
} = require("../utils/responseLang");

const LIMIT_PER_MINUTE = Number(process.env.RATE_LIMIT_PER_MINUTE || 3000);
const BAN_DURATION_MS = Number(process.env.RATE_LIMIT_BAN_MS || 60 * 1000);

function getUtcMinuteBucket(date) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      0,
      0
    )
  );
}

function getUtcHourBucket(date) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      0,
      0,
      0
    )
  );
}

const rateLimitMiddleware = async (req, res, next) => {
  const ip = req.ip || "not-accessed";
  const now = new Date();

  const minuteBucket = getUtcMinuteBucket(now);
  const hourBucket = getUtcHourBucket(now);
  const nextBannedUntil = new Date(now.getTime() + BAN_DURATION_MS);

  try {
    const updated = await IP.findOneAndUpdate(
      {
        ipAddress: ip,
        systemBan: { $ne: "banned" },
        $or: [{ bannedUntil: null }, { bannedUntil: { $lte: now } }],
      },
      [
        {
          $set: {
            ipAddress: ip,
            totalRequests: { $ifNull: ["$totalRequests", 0] },
            requestsPerMinute: { $ifNull: ["$requestsPerMinute", 0] },
            requestsPerHour: { $ifNull: ["$requestsPerHour", 0] },
            minuteTimestamp: { $ifNull: ["$minuteTimestamp", minuteBucket] },
            hourTimestamp: { $ifNull: ["$hourTimestamp", hourBucket] },
            bannedUntil: { $ifNull: ["$bannedUntil", null] },
            systemBan: { $ifNull: ["$systemBan", "notBanned"] },
            lastRequest: { $ifNull: ["$lastRequest", now] },
          },
        },

        {
          $set: {
            _isNewHour: { $ne: ["$hourTimestamp", hourBucket] },
            _isNewMinute: { $ne: ["$minuteTimestamp", minuteBucket] },
          },
        },

        {
          $set: {
            totalRequests: { $add: ["$totalRequests", 1] },

            requestsPerHour: {
              $cond: ["$_isNewHour", 1, { $add: ["$requestsPerHour", 1] }],
            },
            hourTimestamp: hourBucket,

            requestsPerMinute: {
              $cond: ["$_isNewMinute", 1, { $add: ["$requestsPerMinute", 1] }],
            },
            minuteTimestamp: minuteBucket,

            lastRequest: now,
          },
        },

        {
          $set: {
            bannedUntil: {
              $cond: [
                { $gt: ["$requestsPerMinute", LIMIT_PER_MINUTE] },
                nextBannedUntil,
                "$bannedUntil",
              ],
            },
          },
        },

        // Cleanup temporary fields
        { $unset: ["_isNewHour", "_isNewMinute"] },
      ],
      { upsert: true, new: true }
    ).lean();

    if (!updated) {
      const rec = await IP.findOne({ ipAddress: ip })
        .select("systemBan bannedUntil")
        .lean();

      if (rec?.systemBan === "banned") {
        return res.status(StatusCodes.FORBIDDEN).json(excess_request);
      }

      return res.status(StatusCodes.TOO_MANY_REQUESTS).json(excess_request);
    }

    if (updated.requestsPerMinute > LIMIT_PER_MINUTE) {
      return res
        .status(StatusCodes.TOO_MANY_REQUESTS)
        .json(maximum_request_limit);
    }

    next();
  } catch (error) {
    console.error("Rate limit middleware error:", error?.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = rateLimitMiddleware;
