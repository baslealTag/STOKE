const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WarehouseModel = mongoose.model("WarehouseModel", WarehouseSchema);
module.exports = WarehouseModel;
