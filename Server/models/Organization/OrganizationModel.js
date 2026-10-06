const mongoose = require("mongoose");
const {
  multilingualRequired,
  multilingualOptional,
} = require("../../utils/multilingual");

const organizationSchema = new mongoose.Schema(
  {
    name: multilingualRequired,
    location: multilingualOptional,
    description: multilingualOptional,
    canDelegateToOthers: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    functionsAs: {
      type: String,
      enum: ["organization", "city", "subCity", "woreda"],
      default: "organization",
    },

    parentOrg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganizationModel",
    },
    isBranch: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CityModel",
    },
    subCity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCityModel",
    },
    woreda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WoredaModel",
    },
    phone: { type: String, trim: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true },
);

organizationSchema.index({ code: 1 });
organizationSchema.index({ type: 1 });
organizationSchema.index({ status: 1 });
organizationSchema.index({ isBranch: 1 });
organizationSchema.index({ city: 1 });
organizationSchema.index({ subCity: 1 });

const OrganizationModel = mongoose.model(
  "OrganizationModel",
  organizationSchema,
);
module.exports = OrganizationModel;
