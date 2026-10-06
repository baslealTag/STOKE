const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { server_error, not_authorized } = require("../../utils/responseLang");
const {
  invalid_name_caracter,
  name_required,
  weight_created_success,
  invalid_status,
  name_exist,
  weight_not_found,
  no_change_mades,
  weight_deleted,
} = require("../../utils/productLangs");
const WeightTypeModel = require("../../models/WeightType/WeightTypeModel");
const StatusFields = ["active", "inactive"];

const createweight = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { name, status } = req?.body;

    if (!name || typeof name !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).json(name_required);
    }

    const normalizedName = name.trim().toLowerCase(); // ✅ new const, no reassignment

    const existing = await WeightTypeModel.findOne({ name: normalizedName });

    if (existing) {
      return res.status(StatusCodes.CONFLICT).json(name_exist(normalizedName));
    }

    const data = await WeightTypeModel.create({
      name: normalizedName,
      status,
      createdBy: requesterId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json(weight_created_success(data?.name));
  } catch (error) {
    console.log("Error in creating weight", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};
const getWeights = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { status, search } = req?.query || {};

    const filter = {};
    if (status) filter.status = status;
    if (search && typeof search === "string") {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    const data = await WeightTypeModel.find(filter)
      .populate("createdBy", "name email") // optional
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.log("Error in getting weights", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getWeightById = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req?.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).josn(weight_not_found);
    }

    const data = await WeightTypeModel.findById(id).populate(
      "createdBy",
      "name email",
    );
    console.log("Data from the weight ", data);

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json(weight_not_found);
    }

    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log("Error in getting weight by id", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updateWeight = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req?.params;
    let { name, status } = req?.body;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).josn(weight_not_found);
    }

    const weight = await WeightTypeModel.findById(id);
    if (!weight) {
      return res.status(StatusCodes.NOT_FOUND).json(weight_not_found);
    }

    const updateFields = {};

    if (name) {
      if (name !== undefined) {
        const normalizeName = name.trim().toLocaleLowerCase();

        const existing = await WeightTypeModel.findOne({
          name: normalizeName,
          _id: { $ne: id },
        });
        if (existing) {
          return res
            .status(StatusCodes.CONFLICT)
            .json(name_exist(normalizeName));
        }

        updateFields.name = normalizeName;
      }
    }

    if (status !== undefined) {
      if (StatusFields.includes(!status)) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      }
      updateFields.status = status;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(StatusCodes.OK).json(no_change_mades);
    }

    const updated = await WeightTypeModel.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true, runValidator: true },
    );

    return res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    console.log("Error in updating weight", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const deleteWeight = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req?.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(weight_not_found);
    }

    const deleted = await WeightTypeModel.findOne({ _id: id });
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json(weight_not_found);
    }

    const data = await WeightTypeModel.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json(weight_deleted(data.name));
  } catch (error) {
    console.log("Error in deleting weight ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  createweight,
  getWeights,
  getWeightById,
  updateWeight,
  deleteWeight,
};
