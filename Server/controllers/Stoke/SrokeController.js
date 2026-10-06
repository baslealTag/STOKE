const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const StokeModel = require("../../models/Stoke/StokeModel");
const {
  server_error,
  not_authorized,
  not_owner,
  invalid_stoke_id,
  stoke_not_found,
  stoke_name_required,
  invalid_stoke_name,
  stoke_level_required,
  invalid_stoke_level,
  invalid_stoke_product,
  invalid_stoke_category,
  invalid_stoke_supplier,
  no_fields_to_update,
  stoke_created_successfully,
  stokes_fetched_successfully,
  stoke_fetched_successfully,
  stoke_updated_successfully,
  stoke_deleted_successfully,
} = require("../../utils/productLangs");

// ---------- shared helpers ----------

const isNonEmpty = (v) =>
  v !== undefined && v !== null && String(v).trim() !== "";

const parseObjectIdField = (raw) => {
  if (!isNonEmpty(raw)) return null;
  const value = typeof raw === "string" ? raw.trim() : String(raw).trim();
  return mongoose.isValidObjectId(value) ? value : null;
};

const parseNumericField = (raw) => {
  if (!isNonEmpty(raw)) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

const isOwnerOrAdmin = (doc, requester) => {
  const isOwner = String(doc.createdBy) === String(requester.id);
  const isAdmin = ["admin", "super_admin", "superadmin"].includes(
    String(requester.role || "").toLowerCase(),
  );
  return isOwner || isAdmin;
};

// Fields can come from req.body (JSON) OR req.formFields (multipart).
// This helper normalizes both shapes into plain values.
const pickField = (req, key) => {
  const fromForm = req?.formFields?.[key];
  if (Array.isArray(fromForm)) return fromForm[0];
  if (fromForm !== undefined) return fromForm;
  return req?.body?.[key];
};

// ============================================================
// CREATE
// ============================================================
const createStoke = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const rawName = pickField(req, "name");
    const rawProducts = pickField(req, "products");
    const rawStokeCategory = pickField(req, "stokeCategory");
    const rawStokeLevel = pickField(req, "stokeLevel");
    const rawSupplier = pickField(req, "supplier");

    // NAME (required non-empty string)
    if (!isNonEmpty(rawName)) {
      return res.status(StatusCodes.BAD_REQUEST).json(stoke_name_required);
    }
    const name = String(rawName).trim();
    if (name.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_name);
    }

    // STOKE LEVEL (required, non-negative number)
    if (!isNonEmpty(rawStokeLevel)) {
      return res.status(StatusCodes.BAD_REQUEST).json(stoke_level_required);
    }
    const stokeLevel = parseNumericField(rawStokeLevel);
    if (stokeLevel === null || stokeLevel < 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_level);
    }

    // PRODUCTS (optional ObjectId)
    let products;
    if (isNonEmpty(rawProducts)) {
      products = parseObjectIdField(rawProducts);
      if (!products) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_product);
      }
    }

    // STOKE CATEGORY (optional ObjectId)
    let stokeCategory;
    if (isNonEmpty(rawStokeCategory)) {
      stokeCategory = parseObjectIdField(rawStokeCategory);
      if (!stokeCategory) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_category);
      }
    }

    // SUPPLIER (optional ObjectId)
    let supplier;
    if (isNonEmpty(rawSupplier)) {
      supplier = parseObjectIdField(rawSupplier);
      if (!supplier) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_supplier);
      }
    }

    const newStoke = await StokeModel.create({
      name,
      products,
      stokeCategory,
      stokeLevel,
      supplier,
      createdBy: requester.id,
    });

    return res.status(StatusCodes.CREATED).json({
      ...stoke_created_successfully,
      data: newStoke,
    });
  } catch (error) {
    console.error("Error in creating stoke:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// GET ALL
// ============================================================
const getAllStokes = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const page = Math.max(1, parseInt(req?.query?.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req?.query?.limit, 10) || 10),
    );
    const skip = (page - 1) * limit;

    const filter = {};

    const productsFilter = req?.query?.products;
    if (isNonEmpty(productsFilter)) {
      const id = parseObjectIdField(productsFilter);
      if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_product);
      filter.products = id;
    }

    const categoryFilter = req?.query?.stokeCategory;
    if (isNonEmpty(categoryFilter)) {
      const id = parseObjectIdField(categoryFilter);
      if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_category);
      filter.stokeCategory = id;
    }

    const supplierFilter = req?.query?.supplier;
    if (isNonEmpty(supplierFilter)) {
      const id = parseObjectIdField(supplierFilter);
      if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_supplier);
      filter.supplier = id;
    }

    const minLevel = req?.query?.minLevel;
    const maxLevel = req?.query?.maxLevel;
    if (isNonEmpty(minLevel) || isNonEmpty(maxLevel)) {
      filter.stokeLevel = {};
      if (isNonEmpty(minLevel)) {
        const n = parseNumericField(minLevel);
        if (n === null)
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_level);
        filter.stokeLevel.$gte = n;
      }
      if (isNonEmpty(maxLevel)) {
        const n = parseNumericField(maxLevel);
        if (n === null)
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_level);
        filter.stokeLevel.$lte = n;
      }
    }

    const search = req?.query?.search;
    if (isNonEmpty(search)) {
      filter.name = new RegExp(String(search).trim(), "i");
    }

    const sortBy = isNonEmpty(req?.query?.sortBy)
      ? String(req.query.sortBy)
      : "createdAt";
    const sortOrder = String(req?.query?.sortOrder || "desc").toLowerCase();
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [stokes, total] = await Promise.all([
      StokeModel.find(filter)
        .populate("products", "name price stock")
        .populate("stokeCategory", "name")
        .populate("supplier", "name")
        .populate("createdBy", "email username")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      StokeModel.countDocuments(filter),
    ]);

    return res.status(StatusCodes.OK).json({
      ...stokes_fetched_successfully,
      data: stokes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in fetching stokes:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// GET BY ID
// ============================================================
const getStokeById = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_id);
    }

    const stoke = await StokeModel.findById(id)
      .populate("products", "name price stock")
      .populate("stokeCategory", "name")
      .populate("supplier", "name")
      .populate("createdBy", "email username")
      .lean();

    if (!stoke) {
      return res.status(StatusCodes.NOT_FOUND).json(stoke_not_found);
    }

    return res.status(StatusCodes.OK).json({
      ...stoke_fetched_successfully,
      data: stoke,
    });
  } catch (error) {
    console.error("Error in fetching stoke by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// UPDATE
// ============================================================
const updateStoke = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_id);
    }

    const existing = await StokeModel.findById(id);
    if (!existing) {
      return res.status(StatusCodes.NOT_FOUND).json(stoke_not_found);
    }

    if (!isOwnerOrAdmin(existing, requester)) {
      return res.status(StatusCodes.FORBIDDEN).json(not_owner);
    }

    const updates = {};

    // NAME
    const rawName = pickField(req, "name");
    if (rawName !== undefined) {
      if (!isNonEmpty(rawName)) {
        return res.status(StatusCodes.BAD_REQUEST).json(stoke_name_required);
      }
      const name = String(rawName).trim();
      if (name.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_name);
      }
      updates.name = name;
    }

    // STOKE LEVEL
    const rawStokeLevel = pickField(req, "stokeLevel");
    if (
      rawStokeLevel !== undefined &&
      rawStokeLevel !== null &&
      rawStokeLevel !== ""
    ) {
      const n = parseNumericField(rawStokeLevel);
      if (n === null || n < 0) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_level);
      }
      updates.stokeLevel = n;
    }

    // PRODUCTS
    const rawProducts = pickField(req, "products");
    if (rawProducts !== undefined) {
      if (rawProducts === "" || rawProducts === null) {
        updates.products = null; // explicit clear
      } else {
        const pid = parseObjectIdField(rawProducts);
        if (!pid)
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(invalid_stoke_product);
        updates.products = pid;
      }
    }

    // STOKE CATEGORY
    const rawStokeCategory = pickField(req, "stokeCategory");
    if (rawStokeCategory !== undefined) {
      if (rawStokeCategory === "" || rawStokeCategory === null) {
        updates.stokeCategory = null;
      } else {
        const cid = parseObjectIdField(rawStokeCategory);
        if (!cid)
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(invalid_stoke_category);
        updates.stokeCategory = cid;
      }
    }

    // SUPPLIER
    const rawSupplier = pickField(req, "supplier");
    if (rawSupplier !== undefined) {
      if (rawSupplier === "" || rawSupplier === null) {
        updates.supplier = null;
      } else {
        const sid = parseObjectIdField(rawSupplier);
        if (!sid)
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(invalid_stoke_supplier);
        updates.supplier = sid;
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(no_fields_to_update);
    }

    Object.assign(existing, updates);
    const updated = await existing.save();

    return res.status(StatusCodes.OK).json({
      ...stoke_updated_successfully,
      data: updated,
    });
  } catch (error) {
    console.error("Error in updating stoke:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// DELETE
// ============================================================
const deleteStoke = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stoke_id);
    }

    const stoke = await StokeModel.findById(id);
    if (!stoke) {
      return res.status(StatusCodes.NOT_FOUND).json(stoke_not_found);
    }

    if (!isOwnerOrAdmin(stoke, requester)) {
      return res.status(StatusCodes.FORBIDDEN).json(not_owner);
    }

    await StokeModel.deleteOne({ _id: stoke._id });

    return res.status(StatusCodes.OK).json({
      ...stoke_deleted_successfully,
      data: { _id: stoke._id },
    });
  } catch (error) {
    console.error("Error in deleting stoke:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
module.exports = {
  createStoke,
  getAllStokes,
  getStokeById,
  updateStoke,
  deleteStoke,
};
