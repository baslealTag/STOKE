const mongoose = require("mongoose");

const activeSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      index: true,
      required: true,
    },
    sid: {
      type: String,
      required: true,
      index: true,
    },
    uaHash: {
      type: String,
      required: true,
    },
    ipHash: {
      type: String,
      required: true,
    },
    deviceLabel: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

activeSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

activeSessionSchema.index({ user: 1, createdAt: 1 });
activeSessionSchema.index({ user: 1, createdAt: -1 });
activeSessionSchema.index({ user: 1, lastSeenAt: 1 });
activeSessionSchema.index({ user: 1, lastSeenAt: -1 });
activeSessionSchema.index({ ipHash: 1, createdAt: -1 });

activeSessionSchema.index({ createdAt: -1, _id: -1 });
activeSessionSchema.index({ createdAt: 1, _id: 1 });

activeSessionSchema.index({
  user: 1,
  revokedAt: 1,
  expiresAt: 1,
  lastSeenAt: -1,
});

const ActiveSessionModel = mongoose.model(
  "ActiveSessionModel",
  activeSessionSchema
);
module.exports = ActiveSessionModel;
