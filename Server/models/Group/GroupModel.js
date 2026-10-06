const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // e.g., 'Case Authenticator', 'House Registrar'
    },
    lstOfPrms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PermissionModel",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

groupSchema.index({ createdAt: -1, _id: -1 });
groupSchema.index({ createdAt: 1, _id: 1 });

groupSchema.index({ status: 1, createdAt: -1, _id: -1 });
groupSchema.index({ status: 1, createdAt: 1, _id: 1 });
groupSchema.index({ name: 1, status: 1, createdAt: -1, _id: -1 });
groupSchema.index({ name: 1, status: 1, createdAt: 1, _id: 1 });

groupSchema.index({ lstOfPrms: 1, status: 1, createdAt: -1, _id: -1 });
groupSchema.index({ lstOfPrms: 1, status: 1, createdAt: 1, _id: 1 });

const GroupModel = mongoose.model("GroupModel", groupSchema);
module.exports = GroupModel;
