const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { not_authorized, server_error } = require("../../utils/responseLang");
const {
  name_required,
  invalid_input,
  invalid_nummber_insertion,
  warehouse_not_found,
  invalid_name_caracter,
  negative_number_insertion,
  location_required,
  wareHouse_deleted,
} = require("../../utils/productLangs");
const WarehouseModel = require("../../models/Warehouses/WarehousesModel");
const WeightTypeModel = require("../../models/WeightType/WeightTypeModel");

const createWareHouse = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { name, location, capacity } = req?.body;

    // -------- name --------
    if (!name || typeof name !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).json(name_required);
    }
    const trimmedName = name.trim().toLowerCase();

    if (trimmedName.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(name_required);
    }

    const existing = await WarehouseModel.findOne({ name: trimmedName }); // ✅
    if (existing) {
      return res.status(StatusCodes.CONFLICT).json(warehouse_already_exist);
    }

    if (!location || typeof location !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).json(location_required);
    }
    const trimmedLocation = location.trim();
    if (trimmedLocation.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(location_required);
    }

    const numericCapacity = Number(capacity);

    if (
      capacity === undefined ||
      capacity === null ||
      capacity === "" ||
      Number.isNaN(numericCapacity) ||
      !Number.isFinite(numericCapacity)
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(invalid_nummber_insertion);
    }

    if (numericCapacity < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(negative_number_insertion);
    }

    // -------- create --------
    const wareHouse = await WarehouseModel.create({
      name: trimmedName, // ✅
      location: trimmedLocation,
      capacity: numericCapacity,
      createdBy: requesterId,
    });

    return res.status(StatusCodes.CREATED).json(wareHouse); // ✅ 201
  } catch (error) {
    console.log("Error in creating ware house", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updateWareHouse = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req?.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_weight);
    }

    const warehouse = await WarehouseModel.findById(id);
    if (!warehouse) {
      return res.status(StatusCodes.NOT_FOUND).json(warehouse_not_found);
    }

    const { name, location, capacity } = req?.body || {};

    // If no fields provided, reject
    if (
      name === undefined &&
      location === undefined &&
      capacity === undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_input);
    }

    const updateField = {};

    if (name !== undefined) {
      if (!name || typeof name !== "string") {
        return res.status(StatusCodes.BAD_REQUEST).json(name_required);
      }

      const normalizeName = name.trim().toLowerCase();

      if (normalizeName.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json(name_required);
      }

      const existingName = await WarehouseModel.findOne({
        name: normalizeName,
        _id: { $ne: id },
      });

      if (existingName) {
        return res.status(StatusCodes.CONFLICT).json(warehouse_already_exist);
      }

      updateField.name = normalizeName;
    }

    if (location !== undefined) {
      if (!location || typeof location !== "string") {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_input);
      }

      const trimmedLocation = location.trim();

      if (trimmedLocation.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json(location_required);
      }

      updateField.location = trimmedLocation;
    }

    if (capacity !== undefined) {
      const numericCapacity = parseInt(capacity);

      if (
        capacity === null ||
        capacity === "" ||
        Number.isNaN(numericCapacity) ||
        !Number.isFinite(numericCapacity)
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(invalid_nummber_insertion);
      }

      if (numericCapacity < 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(negative_number_insertion);
      }

      updateField.capacity = numericCapacity;
    }

    // If nothing changed after validation
    if (Object.keys(updateField).length === 0) {
      return res.status(StatusCodes.OK).json(no_change_made);
    }

    const updated = await WarehouseModel.findByIdAndUpdate(
      id,
      { $set: updateField },
      { new: true, runValidators: true },
    );

    return res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    console.log("Error in updating ware house", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const deleteWareHouse = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }
    const { id } = req?.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_weight);
    }
    const weight = await WarehouseModel.findById(id);

    if (!weight) {
      return res.status(StatusCodes.NOT_FOUND).json(warehouse_not_found);
    }

    const data = await WarehouseModel.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json(wareHouse_deleted(data?.name));
  } catch (error) {
    console.log("Error in deleting wareHouse", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getWareHouseById = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }
    const { id } = req?.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_weight);
    }
    const warehouse = await WarehouseModel.findById(id);

    if (!warehouse) {
      return res.status(StatusCodes.NOT_FOUND).json(warehouse_not_found);
    }

    return res.status(StatusCodes.OK).json(warehouse);
  } catch (error) {
    console.log("Error in geting ware house", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};
const getWarehouses = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    // Safe numeric parsing with clamps
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20),
    );
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    const filter = {};
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escaped, $options: "i" };
    }

    const [warehouses, total] = await Promise.all([
      WarehouseModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      WarehouseModel.countDocuments(filter),
    ]);

    return res.status(StatusCodes.OK).json({
      data: warehouses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log("Error in getting warehouses", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};
module.exports = {
  createWareHouse,
  getWareHouseById,
  deleteWareHouse,
  updateWareHouse,
  getWarehouses,
};
