const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    isSuperAdmin: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    position: {
      type: String,
      required: true,
    },
    group: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupModel",
        required: function () {
          return this.isSuperAdmin !== "yes";
        },
      },
    ],
    addPrms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PermissionModel",
      },
    ],
    restrictedPrms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PermissionModel",
      },
    ],
    haslogged: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    hasChangedPwd: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    failed_login_attempts: {
      type: Number,
      default: 0,
    },
    lockout_until: {
      type: Date,
    },
    last_logged_in: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    picture: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: function () {
        return this.isSuperAdmin !== "yes";
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ group: 1 });
userSchema.index({ status: 1 });

userSchema.index({ fullname: 1 });

userSchema.index({ createdAt: 1, _id: 1 });
userSchema.index({ createdAt: 1, _id: -1 });

userSchema.index({ status: 1, createdAt: -1, _id: -1 });
userSchema.index({ group: 1, status: 1, createdAt: -1, _id: -1 });
userSchema.index({ isSuperAdmin: 1, status: 1, createdAt: -1, _id: -1 });
userSchema.index({ gender: 1, status: 1, createdAt: -1, _id: -1 });
userSchema.index({ position: 1, status: 1, createdAt: -1, _id: -1 });
userSchema.index({ last_logged_in: 1, createdAt: -1 });

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
