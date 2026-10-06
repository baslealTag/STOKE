const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const ProductsModel = require("../../models/Products/ProductsModel");
const { validateAndSaveFile } = require("../../utils/fileValidator");
const {
  DEFAULT_LANGS,
  normalizeRequiredMultilingual,
  normalizeOptionalMultilingual,
} = require("../../utils/MultiLingualValidation");
const {
  server_error,
  data_parsing_error,
  invalid_product_id,
  product_not_found,
  not_authorized,
  not_owner,
  name_required,
  description_required,
  invalid_product_category,
  product_category_notfound,
  product_image_required,
  product_supplier_required,
  supplier_not_found,
  product_weight_required,
  invalid_weight_insertion,
  weight_should_be_positive_number,
  product_weighttype_required,
  invalid_weight_type,
  product_price_required,
  invalid_price,
  product_stock_required,
  invalid_stock,
  invalid_status,
  no_fields_to_update,
  product_created_successfully,
  products_fetched_successfully,
  product_fetched_successfully,
  product_updated_successfully,
  product_deleted_successfully,
} = require("../../utils/productLangs");

// ---------- constants ----------
const PICTURE_SIZE_MB = 5;
const ALLOWED_IMAGE_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ALLOWED_STATUS = ["active", "inactive"];

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

const safeDeleteFile = (filePath) => {
  if (!filePath) return;
  try {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch (err) {
    console.warn("Could not delete file:", filePath, err?.message);
  }
};

const isOwnerOrAdmin = (product, requesterId, requesterRole) => {
  const isOwner = String(product.createdBy) === String(requesterId);
  const isAdmin = ["admin", "super_admin", "superadmin"].includes(
    String(requesterRole || "").toLowerCase(),
  );
  return isOwner || isAdmin;
};

// ============================================================
// CREATE
// ============================================================
const createProduct = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const fields = req?.formFields || {};
    const files = req?.formFiles || {};

    const rawName = fields?.name?.[0];
    const rawDescription = fields?.description?.[0];
    const rawProductCategory = fields?.productCategory?.[0];
    const rawSupplier = fields?.supplier?.[0];
    const rawWeight = fields?.weight?.[0];
    const rawWeightType = fields?.weightType?.[0];
    const rawPrice = fields?.price?.[0];
    const rawStock = fields?.stock?.[0];
    const rawStatus = fields?.status?.[0];
    const productImage = files?.productImage?.[0];

    // NAME
    if (!rawName)
      return res.status(StatusCodes.BAD_REQUEST).json(name_required);
    const nameResult = normalizeRequiredMultilingual(rawName, DEFAULT_LANGS);
    if (!nameResult.ok) {
      if (!nameResult.missingLang)
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        Message_en: `Missing name field for language: ${nameResult.missingLang}`,
        Message_am: `የስም መስክ ለቋንቋው ጎድሏል: ${nameResult.missingLang}`,
      });
    }

    // DESCRIPTION (optional)
    const descResult = normalizeOptionalMultilingual(
      rawDescription,
      DEFAULT_LANGS,
    );
    if (!descResult.ok)
      return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);

    // CATEGORY
    if (!rawProductCategory)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(product_category_notfound);
    const productCategory = parseObjectIdField(rawProductCategory);
    if (!productCategory)
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_product_category);

    // SUPPLIER
    if (!rawSupplier)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(product_supplier_required);
    const supplier = parseObjectIdField(rawSupplier);
    if (!supplier)
      return res.status(StatusCodes.BAD_REQUEST).json(supplier_not_found);

    // WEIGHT
    if (!isNonEmpty(rawWeight))
      return res.status(StatusCodes.BAD_REQUEST).json(product_weight_required);
    const weight = parseNumericField(rawWeight);
    if (weight === null)
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_weight_insertion);
    if (weight <= 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(weight_should_be_positive_number);

    // WEIGHT TYPE
    if (!rawWeightType)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(product_weighttype_required);
    const weightType = parseObjectIdField(rawWeightType);
    if (!weightType)
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_weight_type);

    // PRICE
    if (!isNonEmpty(rawPrice))
      return res.status(StatusCodes.BAD_REQUEST).json(product_price_required);
    const price = parseNumericField(rawPrice);
    if (price === null || price < 0)
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_price);

    // STOCK
    if (!isNonEmpty(rawStock))
      return res.status(StatusCodes.BAD_REQUEST).json(product_stock_required);
    const stock = parseNumericField(rawStock);
    if (stock === null || !Number.isInteger(stock) || stock < 1)
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_stock);

    // STATUS
    let status = "active";
    if (isNonEmpty(rawStatus)) {
      const candidate = String(rawStatus).trim().toLowerCase();
      if (!ALLOWED_STATUS.includes(candidate))
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      status = candidate;
    }

    // IMAGE
    if (!productImage)
      return res.status(StatusCodes.BAD_REQUEST).json(product_image_required);
    let savedFilePath;
    try {
      savedFilePath = await validateAndSaveFile(productImage, {
        folder: "ProductPictures",
        allowedMimeTypes: ALLOWED_IMAGE_MIMES,
        maxSizeMB: PICTURE_SIZE_MB,
      });
    } catch (err) {
      const payload = err?.payload || {
        Message_en:
          err?.message ||
          `The uploaded picture is invalid. Please upload a picture in .jpeg, .jpg, .png, or .webp format and with a size not exceeding ${PICTURE_SIZE_MB}MB.`,
        Message_am: `የተሰቀለው ምስል ልክ ያልሆነ ነው። እባክዎ በ '.jpeg'፣ '.jpg'፣ '.png' ወይም '.webp' ቅርጸት እና ከ ${PICTURE_SIZE_MB}MB ያልበለጠ መጠን ያለው ምስል ይስቀሉ።`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(payload);
    }

    const newProduct = await ProductsModel.create({
      name: nameResult.value,
      description: descResult.value,
      productCategory,
      productImage: savedFilePath,
      supplier,
      weight,
      weightType,
      price,
      stock,
      status,
      createdBy: requesterId,
    });

    return res.status(StatusCodes.CREATED).json({
      ...product_created_successfully,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in creating product:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// GET ALL
// ============================================================
const getAllProducts = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    // Pagination
    const page = Math.max(1, parseInt(req?.query?.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req?.query?.limit, 10) || 10),
    );
    const skip = (page - 1) * limit;

    // Filters
    const filter = {};

    const statusFilter = req?.query?.status;
    if (isNonEmpty(statusFilter)) {
      const candidate = String(statusFilter).trim().toLowerCase();
      if (!ALLOWED_STATUS.includes(candidate)) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      }
      filter.status = candidate;
    }

    const categoryFilter = req?.query?.productCategory;
    if (isNonEmpty(categoryFilter)) {
      const id = parseObjectIdField(categoryFilter);
      if (!id)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(invalid_product_category);
      filter.productCategory = id;
    }

    const supplierFilter = req?.query?.supplier;
    if (isNonEmpty(supplierFilter)) {
      const id = parseObjectIdField(supplierFilter);
      if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json(supplier_not_found);
      filter.supplier = id;
    }

    const search = req?.query?.search;
    if (isNonEmpty(search)) {
      const regex = new RegExp(String(search).trim(), "i");
      filter.$or = [{ "name.en": regex }, { "name.am": regex }];
    }

    // Sort
    const sortBy = isNonEmpty(req?.query?.sortBy)
      ? String(req.query.sortBy)
      : "createdAt";
    const sortOrder = String(req?.query?.sortOrder || "desc").toLowerCase();
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [products, total] = await Promise.all([
      ProductsModel.find(filter)
        .populate("productCategory", "name")
        .populate("supplier", "name")
        .populate("weightType", "name")
        .populate("createdBy", "email username")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      ProductsModel.countDocuments(filter),
    ]);

    return res.status(StatusCodes.OK).json({
      ...products_fetched_successfully,
      data: products,
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
    console.error("Error in fetching products:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// GET BY ID
// ============================================================
const getProductById = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_product_id);
    }

    const product = await ProductsModel.findById(id)
      .populate("productCategory", "name")
      .populate("supplier", "name")
      .populate("weightType", "name")
      .populate("createdBy", "email username")
      .lean();

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json(product_not_found);
    }

    return res.status(StatusCodes.OK).json({
      ...product_fetched_successfully,
      data: product,
    });
  } catch (error) {
    console.error("Error in fetching product by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// UPDATE
// ============================================================
const updateProduct = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    const requesterRole = req?.user?.role;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_product_id);
    }

    const existing = await ProductsModel.findById(id);
    if (!existing) {
      return res.status(StatusCodes.NOT_FOUND).json(product_not_found);
    }

    if (!isOwnerOrAdmin(existing, requesterId, requesterRole)) {
      return res.status(StatusCodes.FORBIDDEN).json(not_owner);
    }

    const fields = req?.formFields || {};
    const files = req?.formFiles || {};
    const updates = {};

    // NAME
    const rawName = fields?.name?.[0];
    if (isNonEmpty(rawName)) {
      const r = normalizeRequiredMultilingual(rawName, DEFAULT_LANGS);
      if (!r.ok) {
        if (!r.missingLang)
          return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
        return res.status(StatusCodes.BAD_REQUEST).json({
          Message_en: `Missing name field for language: ${r.missingLang}`,
          Message_am: `የስም መስክ ለቋንቋው ጎድሏል: ${r.missingLang}`,
        });
      }
      updates.name = r.value;
    }

    // DESCRIPTION
    const rawDescription = fields?.description?.[0];
    if (rawDescription !== undefined) {
      const r = normalizeOptionalMultilingual(rawDescription, DEFAULT_LANGS);
      if (!r.ok)
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      if (r.value !== undefined) updates.description = r.value;
    }

    // CATEGORY
    const rawProductCategory = fields?.productCategory?.[0];
    if (isNonEmpty(rawProductCategory)) {
      const cat = parseObjectIdField(rawProductCategory);
      if (!cat)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(invalid_product_category);
      updates.productCategory = cat;
    }

    // SUPPLIER
    const rawSupplier = fields?.supplier?.[0];
    if (isNonEmpty(rawSupplier)) {
      const sup = parseObjectIdField(rawSupplier);
      if (!sup)
        return res.status(StatusCodes.BAD_REQUEST).json(supplier_not_found);
      updates.supplier = sup;
    }

    // WEIGHT
    const rawWeight = fields?.weight?.[0];
    if (isNonEmpty(rawWeight)) {
      const w = parseNumericField(rawWeight);
      if (w === null)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(invalid_weight_insertion);
      if (w <= 0)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(weight_should_be_positive_number);
      updates.weight = w;
    }

    // WEIGHT TYPE
    const rawWeightType = fields?.weightType?.[0];
    if (isNonEmpty(rawWeightType)) {
      const wt = parseObjectIdField(rawWeightType);
      if (!wt)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_weight_type);
      updates.weightType = wt;
    }

    // PRICE
    const rawPrice = fields?.price?.[0];
    if (isNonEmpty(rawPrice)) {
      const p = parseNumericField(rawPrice);
      if (p === null || p < 0)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_price);
      updates.price = p;
    }

    // STOCK
    const rawStock = fields?.stock?.[0];
    if (isNonEmpty(rawStock)) {
      const s = parseNumericField(rawStock);
      if (s === null || !Number.isInteger(s) || s < 1)
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_stock);
      updates.stock = s;
    }

    // STATUS
    const rawStatus = fields?.status?.[0];
    if (isNonEmpty(rawStatus)) {
      const candidate = String(rawStatus).trim().toLowerCase();
      if (!ALLOWED_STATUS.includes(candidate))
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      updates.status = candidate;
    }

    // IMAGE (optional replacement)
    const newImage = files?.productImage?.[0];
    let savedNewImagePath;
    if (newImage) {
      try {
        savedNewImagePath = await validateAndSaveFile(newImage, {
          folder: "ProductPictures",
          allowedMimeTypes: ALLOWED_IMAGE_MIMES,
          maxSizeMB: PICTURE_SIZE_MB,
        });
        updates.productImage = savedNewImagePath;
      } catch (err) {
        const payload = err?.payload || {
          Message_en:
            err?.message ||
            `The uploaded picture is invalid. Please upload a picture in .jpeg, .jpg, .png, or .webp format and with a size not exceeding ${PICTURE_SIZE_MB}MB.`,
          Message_am: `የተሰቀለው ምስል ልክ ያልሆነ ነው። እባክዎ በ '.jpeg'፣ '.jpg'፣ '.png' ወይም '.webp' ቅርጸት እና ከ ${PICTURE_SIZE_MB}MB ያልበለጠ መጠን ያለው ምስል ይስቀሉ።`,
        };
        return res.status(StatusCodes.BAD_REQUEST).json(payload);
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(no_fields_to_update);
    }

    const oldImagePath = existing.productImage;

    Object.assign(existing, updates);
    const updated = await existing.save();

    // Clean up old image after successful save
    if (
      updates.productImage &&
      oldImagePath &&
      oldImagePath !== updates.productImage
    ) {
      safeDeleteFile(oldImagePath);
    }

    return res.status(StatusCodes.OK).json({
      ...product_updated_successfully,
      data: updated,
    });
  } catch (error) {
    console.error("Error in updating product:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
// DELETE
// ============================================================
const deleteProduct = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    const requesterRole = req?.user?.role;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_product_id);
    }

    const product = await ProductsModel.findById(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json(product_not_found);
    }

    if (!isOwnerOrAdmin(product, requesterId, requesterRole)) {
      return res.status(StatusCodes.FORBIDDEN).json(not_owner);
    }

    const imagePath = product.productImage;

    await ProductsModel.deleteOne({ _id: product._id });

    // Remove file from disk after successful DB delete
    if (imagePath) safeDeleteFile(imagePath);

    return res.status(StatusCodes.OK).json({
      ...product_deleted_successfully,
      data: { _id: product._id },
    });
  } catch (error) {
    console.error("Error in deleting product:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

// ============================================================
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
