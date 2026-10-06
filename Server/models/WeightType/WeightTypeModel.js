const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
});

const WeightTypeModel = mongoose.model("WeightTypeModel", weightSchema);

module.exports = WeightTypeModel;
