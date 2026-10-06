const mongoose = require("mongoose");
const { multilingualRequired } = require("../../utils/multilingual.js");

const SupplierSchema = new mongoose.Schema(
  {
    companyName: multilingualRequired,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    companyPhone: {
      type: String,
      required: true,
    },

    bussinesslicence: {
      type: String,
      required: true,
    },

    companyemail: {
      type: String,
      required: true,
    },

    supplierAddress: multilingualRequired,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  },
);

SupplierSchema.index({ owner: 1, createdAt: -1 });

SupplierSchema.index({ owner: 1, bussinesslicence: 1 }, { unique: true });

SupplierSchema.index({ owner: 1, companyemail: 1 }, { unique: true });

SupplierSchema.index({ owner: 1, companyPhone: 1 }, { unique: true });

SupplierSchema.index({ createdBy: 1 });

const supplierModel = mongoose.model("supplierModel", SupplierSchema);

module.exports = supplierModel;
