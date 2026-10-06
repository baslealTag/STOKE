const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const UserModel = require("../models/User/UserModel");
const { not_authorized, server_error } = require("../utils/responseLang");

const NOT_AUTHORIZED = not_authorized;
const INTERNAL_ERROR = server_error;

/**
 * Simple context resolver.
 * Resolves the user's primary organization context based on the currentOrgId in authContext.
 */
async function getEffectiveUserContext({ requesterId, authContext }) {
  try {
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return { valid: false, message: NOT_AUTHORIZED };
    }

    const currentOrgId = authContext?.currentOrgId || null;
    let organization = [];
    let user_id = null;

    const requester = await UserModel.findOne({ _id: requesterId })
      .select("status orgIds")
      .lean();

    if (!requester) {
      return { valid: false, message: NOT_AUTHORIZED };
    }
    if (requester.status !== "active") {
      return { valid: false, message: NOT_AUTHORIZED };
    }

    organization = requester.orgIds;
    user_id = requester._id.toString();

    if (currentOrgId && mongoose.isValidObjectId(currentOrgId)) {
      // Context is valid for the requested organization
      return {
        valid: true,
        user_id,
        organization,
        currentOrgId: currentOrgId.toString(),
      };
    } else {
      // Fallback or missing org context
      return {
        valid: true,
        user_id,
        organization,
      };
    }
  } catch (error) {
    return { valid: false, message: INTERNAL_ERROR };
  }
}

module.exports = {
  getEffectiveUserContext,
};
