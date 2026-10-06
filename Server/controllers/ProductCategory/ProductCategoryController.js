const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const ProductCategoryModel = require("../../models/ProductCategory/ProductCategoryModel");

const {
  not_authorized,
  server_error,
  data_parsing_error,
  invalid_request,
  missing_multilingual_fields,
  isValidString,
} = require("../../utils/responseLang2");

const {
  category_name_unavalable,
  product_categoryname_required,
  invalid_status,
  invalid_description_insertion,

  product_cate_unavalable,
} = require("../../utils/productLangs");

const ProductCategoryModel = require("../../models/ProductCategory/ProductCategory");

const LANGUAGES = ["en", "am"];
const allowedStatus = ["active", "inactive"];

const normalizeRequiredMultilingual = (input, field) => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "invalid" };
  }
  const out = {};
  for (const lang of LANGUAGES) {
    const val = input[lang];
    if (!isValidString(val)) {
      return { ok: false, error: { lang, field } };
    }
    out[lang] = val.trim();
  }
  return { ok: true, value: out };
};

const normalizeOptionalMultilingual = (input, field) => {
  if (input === undefined || input === null) return { ok: true, value: {} };
  if (typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "invalid" };
  }
  const out = {};
  for (const lang of LANGUAGES) {
    const val = input[lang];
    if (val === undefined || val === null || val === "") continue;
    if (!isValidString(val)) {
      return { ok: false, error: { lang, field } };
    }
    out[lang] = val.trim();
  }
  return { ok: true, value: out };
};

const CreateProductCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { name, description, status } = req?.body ?? {};

    // --- name (required) ---
    const nameResult = normalizeRequiredMultilingual(name, "name");
    if (!nameResult) {
      if (nameResult.error === "invalid") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(product_categoryname_required);
      }
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          missing_multilingual_fields(
            nameResult.error.field,
            nameResult.error.lang,
          ),
        );
    }
    const normalizedName = nameResult.value;

    const nameChecks = Object.entries(normalizedName).map(([lang, value]) => ({
      [`name.${lang}`]: value,
    }));
    const existing = await ProductCatgoryModel.findOne({
      $or: nameChecks,
    }).lean();
    if (existing) {
      return res.status(StatusCodes.CONFLICT).json(category_name_unavalable);
    }

    const descResult = normalizeOptionalMultilingual(
      description,
      "description",
    );
    if (!descResult.ok) {
      if (descResult.error === "invalid") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(invalid_description_insertion);
      }
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          missing_multilingual_fields(
            descResult.error.field,
            descResult.error.lang,
          ),
        );
    }
    const normalizedDescription = descResult.value;

    let finalStatus = "active";
    if (status !== undefined) {
      if (typeof status !== "string" || !allowedStatus.includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      }
      finalStatus = status;
    }

    const category = await ProductCategoryModel.create({
      name: normalizedName,
      description: normalizedDescription,
      status: finalStatus,
    });

    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const UpdateProductCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
    }

    const exist = await ProductCategoryModel.findById(id).lean();
    if (!exist) {
      return res.status(StatusCodes.BAD_REQUEST).json(product_cate_unavalable);
    }

    const { name, description, status } = req.body || {};
    const updatedFields = {};

    // --- name ---
    if (name !== undefined) {
      let parsedName = name;
      if (typeof name === "string") {
        try {
          parsedName = JSON.parse(name);
        } catch {
          return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
        }
      }
      const nameResult = normalizeRequiredMultilingual(parsedName, "name");
      if (!nameResult.ok) {
        if (nameResult.error === "invalid") {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(product_categoryname_required);
        }
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            missing_multilingual_fields(
              nameResult.error.field,
              nameResult.error.lang,
            ),
          );
      }

      const nameChecks = Object.entries(nameResult.value).map(
        ([lang, value]) => ({ [`name.${lang}`]: value }),
      );
      const duplicate = await ProductCategoryModel.findOne({
        _id: { $ne: id },
        $or: nameChecks,
      }).lean();
      if (duplicate) {
        return res.status(StatusCodes.CONFLICT).json(category_name_unavalable);
      }

      updatedFields.name = nameResult.value;
    }

    if (description !== undefined) {
      let parsedDescription = description;
      if (typeof description === "string") {
        try {
          parsedDescription = JSON.parse(description);
        } catch {
          return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
        }
      }
      const descResult = normalizeOptionalMultilingual(
        parsedDescription,
        "description",
      );
      if (!descResult.ok) {
        if (descResult.error === "invalid") {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(invalid_description_insertion);
        }
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            missing_multilingual_fields(
              descResult.error.field,
              descResult.error.lang,
            ),
          );
      }
      updatedFields.description = descResult.value;
    }

    if (status !== undefined) {
      if (typeof status !== "string" || !allowedStatus.includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_status);
      }
      updatedFields.status = status;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
    }

    const updatedCategory = await ProductCategoryModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true },
    ).lean();

    return res.status(StatusCodes.OK).json(updatedCategory);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getProductCategories = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const categories = await ProductCategoryModel.find().lean();
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getProductCategoryById = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
    }

    const category = await ProductCategoryModel.findById(id).lean();
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json(product_cate_unavalable);
    }

    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
    }

    const deleted = await ProductCategoryModel.findByIdAndDelete(id).lean();
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json(product_cate_unavalable);
    }

    return res.status(StatusCodes.OK).json(deleted);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  CreateProductCategory,
  UpdateProductCategory,
  getProductCategories,
  getProductCategoryById,
  deleteProductCategory,
};
