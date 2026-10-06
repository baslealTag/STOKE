const User = require("../../models/User/UserModel");
const AuditLog = require("../../models/Audit/AuditLogModel");

const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const {
  server_error,
  not_authorized,
  invalid_request,
  audit_log_not_found,
  audit_logs_not_found,
} = require("../../utils/responseLang");

const getAuditLogs = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let page = parseInt(req?.query?.page) || 1;
    let limit = parseInt(req?.query?.limit) || 10;
    let sortBy = parseInt(req?.query?.sort) || -1;
    let userId = req?.query?.user_id || null;
    let status = req?.query?.status || "";
    let createdAt = req?.query?.createdAt || "";

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0) {
      limit = 10;
    }
    if (sortBy !== 1 && sortBy !== -1) {
      sortBy = -1;
    }
    if (status === "" || status === null) {
      status = "";
    }

    if (!userId) {
      userId = null;
    }
    if (userId) {
      if (!userId || !mongoose.isValidObjectId(userId)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
      }
    }

    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      userId = null;
    }

    const query = {};

    if (userId) {
      query.user_id = userId;
    }

    if (status) {
      query.status = status;
    }

    if (createdAt) {
      const startOfDay = new Date(createdAt);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(createdAt);
      endOfDay.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const totalAuditLog = await AuditLog.countDocuments(query);
    const totalPages = Math.ceil(totalAuditLog / limit);

    if (page > totalPages) {
      page = 1;
    }

    const skip = (page - 1) * limit;

    const findAuditLog = await AuditLog.find(query)
      .sort({ createdAt: sortBy, _id: sortBy })
      .skip(skip)
      .limit(limit)
      .populate({ path: "user_id", select: "fullname email position" });

    if (!findAuditLog) {
      return res.status(StatusCodes.NOT_FOUND).json(audit_logs_not_found);
    }

    return res.status(StatusCodes.OK).json({
      auditLogs: findAuditLog,
      totalAuditLog,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAuditLog = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findAuditLog = await AuditLog.findOne({ _id: id }).populate({
      path: "user_id",
      select: "fullname email position",
    });

    if (!findAuditLog) {
      return res.status(StatusCodes.NOT_FOUND).json(audit_log_not_found);
    }

    return res.status(StatusCodes.OK).json(findAuditLog);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAuditLogAnalytics = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const totalAuditLog = await AuditLog.countDocuments();

    const mostActiveUsers = await AuditLog.aggregate([
      { $group: { _id: "$user_id", actionsCount: { $sum: 1 } } },
      { $sort: { actionsCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "usermodels",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          user_id: "$user._id",
          fullname: "$user.fullname",
          actionsCount: 1,
        },
      },
    ]);

    const frequentActions = await AuditLog.aggregate([
      { $group: { _id: "$action", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const popularEndpoints = await AuditLog.aggregate([
      { $group: { _id: "$requestPath", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const uniqueIPsAgg = await AuditLog.aggregate([
      { $group: { _id: "$ipAddress" } },
      { $count: "count" },
    ]);

    const uniqueIPsCount = uniqueIPsAgg?.[0]?.count || 0;

    res.status(StatusCodes.OK).json({
      totalAuditLog,
      mostActiveUsers,
      frequentActions,
      popularEndpoints,
      uniqueIPsCount,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  getAuditLogs,
  getAuditLog,
  getAuditLogAnalytics,
};
