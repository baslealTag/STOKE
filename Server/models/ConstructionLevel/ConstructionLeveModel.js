const mongoose = require("mongoose");

const ConstructionLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
    },
    level: {
      type: Number,
      required: true,
    },
    maxProjectValue: {
      type: Number, // in ETB
    },
    minExperienceYears: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true },
);

const ConstructionLevelModel = mongoose.model(
  "ConstructionLevelModel",
  ConstructionLevelSchema,
);

module.exports = ConstructionLevelModel;
