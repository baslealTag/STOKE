const mongoose = require("mongoose");
const {
  multilingualRequired,
  multilingualOptional,
} = require("../../utils/multilingual");

const ProductSchema = new mongoose.Schema(
  {
    name: multilingualRequired,
    description: {
      multilingualOptional,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategoryModel",
      required: true,
    },

    productImage: {
      type: String,
      required: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplierModel",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },
    weightType: {
      type: mongoose.Types.ObjectId,
      ref: "WeightTypeModel",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProductsModel = mongoose.model("ProductsModel", ProductSchema);

module.exports = ProductsModel;
