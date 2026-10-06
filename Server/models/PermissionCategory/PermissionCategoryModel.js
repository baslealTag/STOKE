const mongoose = require("mongoose");

const permissionCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

permissionCategorySchema.index({ createdAt: 1 });
permissionCategorySchema.index({ createdAt: -1 });
permissionCategorySchema.index({ createdBy: 1, createdAt: -1 });

permissionCategorySchema.index({ createdAt: 1, _id: 1 });
permissionCategorySchema.index({ name: 1, createdAt: -1, _id: -1 });

const PermissionCategoryModel = mongoose.model(
  "PermissionCategoryModel",
  permissionCategorySchema
);
module.exports = PermissionCategoryModel;
