const mongoose = require("mongoose");

const StokeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductsModel",
    },
    stokeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategoryModel",
    },
    stokeLevel: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplierModel",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  },
);

// FIX: model name must match the exported/registered name used in refs
const StokeModel =
  mongoose.models.StokeModel || mongoose.model("StokeModel", StokeSchema);

module.exports = StokeModel;
