const User = require("../models/User/UserModel");
const Group = require("../models/Group/GroupModel");
const ActiveSessionModel = require("../models/ActiveSession/ActiveSessionModel");

const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { sessionHashes } = require("../utils/sessionHelpers");
const {
  authorization_expired,
  authorization_not_provided,
  not_authorized,
  user_login_inactive,
  user_group_inactive,
  user_password_change_issue,
  server_error,
} = require("../utils/responseLang");

const checkTokenExpiration = (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt ||
      req.headers?.authorization?.split(" ")[1] ||
      req.headers?.Authorization?.split(" ")[1];

    if (!token) {
      console.log("the value of token");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(authorization_not_provided);
    }

    const { ACCESS_TOKEN_SECRET, JWT_ISS, JWT_AUD_CMS_API } = process.env;

    if (!ACCESS_TOKEN_SECRET) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
    }

    const verifyOptions = {
      algorithms: ["HS256"],
    };

    if (JWT_ISS) verifyOptions.issuer = JWT_ISS;
    if (JWT_AUD_CMS_API) verifyOptions.audience = JWT_AUD_CMS_API;

    jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      verifyOptions,
      async (err, decoded) => {
        if (err) {
          res.clearCookie("jwt");
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(authorization_expired);
        }

        const userId = decoded?.sub || decoded?.user?.id;
        const sid = decoded?.sid || decoded?.jti;

        if (!userId || !sid) {
          res.clearCookie("jwt");
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(authorization_expired);
        }

        const session = await ActiveSessionModel.findOne({
          sid,
          user: userId,
          revokedAt: null,
          expiresAt: { $gt: new Date() },
        }).lean();

        if (!session) {
          res.clearCookie("jwt");
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(authorization_expired);
        }

        const { uaHash, ipHash } = sessionHashes(req);
        const bindUaStrict = process.env.BIND_UA_STRICT === "true";
        const bindIpStrict = process.env.BIND_IP_STRICT === "true";

        if (bindUaStrict && uaHash !== session.uaHash) {
          res.clearCookie("jwt");
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(authorization_expired);
        }

        if (bindIpStrict && ipHash !== session.ipHash) {
          res.clearCookie("jwt");
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(authorization_expired);
        }

        const user = await User.findById(userId).select(
          "status fullname group passwordChangedAt",
        );

        if (!user) {
          res.clearCookie("jwt");
          return res.status(StatusCodes.NOT_FOUND).json(not_authorized);
        }

        if (user?.status === "inactive") {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(user_login_inactive(user?.fullname?.toLocaleUpperCase()));
        }

        if (user?.passwordChangedAt && decoded?.iat) {
          const tokenIssuedAt = decoded.iat * 1000;
          const pwdChangedAtTime = new Date(user.passwordChangedAt).getTime();
          if (tokenIssuedAt < pwdChangedAtTime) {
            res.clearCookie("jwt");
            return res
              .status(StatusCodes.UNAUTHORIZED)
              .json(user_password_change_issue);
          }
        }

        if (user?.group) {
          const findUserGrp = await Group.findById(user?.group)
            .select("status")
            .lean();
          if (!findUserGrp || findUserGrp?.status === "inactive") {
            return res.status(StatusCodes.FORBIDDEN).json(user_group_inactive);
          }
        }

        ActiveSessionModel.updateOne(
          { _id: session._id },
          { $set: { lastSeenAt: new Date() } },
        ).catch(() => {});

        req.user = { id: userId, sid };
        next();
      },
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = checkTokenExpiration;
