const mongoose = require("mongoose");
const {
  multilingualRequired,
  multilingualOptional,
} = require("../../utils/multilingual");

const ProductCategorySchema = new mongoose.Schema(
  {
    name: multilingualRequired,
    description: multilingualOptional,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const ProductCategoryModel = mongoose.model(
  "ProductCategoryModel",
  ProductCategorySchema,
);
module.exports = ProductCategoryModel;
