const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    action: {
      type: String,
      required: true,
    },
    params: {
      type: String,
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    requestPath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ createdAt: -1, _id: -1 });
auditLogSchema.index({ createdAt: 1, _id: 1 });
auditLogSchema.index({ user_id: 1, createdAt: 1 });
auditLogSchema.index({ user_id: 1, createdAt: -1 });

auditLogSchema.index({ user_id: 1, createdAt: -1, _id: -1 });
auditLogSchema.index({ requestPath: 1, createdAt: -1, _id: -1 });
auditLogSchema.index({ ipAddress: 1, createdAt: -1, _id: -1 });
auditLogSchema.index({ action: 1, createdAt: -1, _id: -1 });
auditLogSchema.index({ action: 1, status: 1, createdAt: -1 });

auditLogSchema.index({ status: 1, createdAt: -1, _id: -1 });

const AuditLogModel = mongoose.model("AuditLogModel", auditLogSchema);
module.exports = AuditLogModel;
