const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    totalRequests: {
      type: Number,
      default: 0,
    },
    requestsPerMinute: {
      type: Number,
      default: 0,
    },
    minuteTimestamp: {
      type: Date,
    },
    requestsPerHour: {
      type: Number,
      default: 0,
    },
    hourTimestamp: {
      type: Date,
    },
    lastRequest: {
      type: Date,
    },
    bannedUntil: {
      type: Date,
      default: null,
    },
    systemBan: {
      type: String,
      enum: ["banned", "notBanned"],
      default: "notBanned",
    },
  },
  {
    timestamps: true,
  }
);

ipSchema.index({ createdAt: -1, _id: -1 });
ipSchema.index({ createdAt: 1, _id: 1 });

ipSchema.index({ ipAddress: 1 });

ipSchema.index({ systemBan: 1, bannedUntil: 1, createdAt: -1, _id: -1 });
ipSchema.index({ bannedUntil: 1, createdAt: -1, _id: -1 });

ipSchema.index({ bannedUntil: 1, lastRequest: -1 });
ipSchema.index({ ipAddress: 1, createdAt: -1 });

const IPModel = mongoose.model("IPModel", ipSchema);

module.exports = IPModel;
