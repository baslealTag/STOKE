const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const {
  server_error,
  not_authorized,
  companyname_required,
  user_email_format_invalid,
  user_emailspace_format,
  user_email_duplicate,
  user_phone_duplicate,
} = require("../../utils/responseLang");
const {
  owner_name_required,
  company_phone_required,
  supplier_address_require,
  bussiness_licence_require,
  company_email_required,
  invalid_supplier_id,
  supplier_not_found,
  invalid_id,
  deleted_supplier,
} = require("../../utils/productLangs");
const supplierModel = require("../../models/Supplier/SupplierModel");
const {
  validateAndNormalizeEthiopianPhone,
} = require("../../utils/phoneValidator");
const WarehouseModel = require("../../models/Warehouses/WarehousesModel");
const { validateAndSaveFile } = require("../../utils/fileValidator");
const { pictureSize } = require("../../utils/fileSize");
const {
  extractMultilingual,
  validateRequiredMultilingual,
  prettyLangList,
  mergeMultilingual,
  buildMultilingualError,
} = require("../../utils/extractMultilingual");

const createSupplier = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const fields = req?.formFields;
    const files = req?.formFiles;

    // ---------- Multilingual extraction ----------
    const companyName = extractMultilingual(fields, "companyName");
    const supplierAddress = extractMultilingual(fields, "supplierAddress");

    // ---------- Scalar fields ----------
    const owner = fields?.owner?.[0];
    const companyPhone = fields?.companyPhone?.[0]; // ✅ FIXED
    const companyemail = fields?.companyemail?.[0];
    const bussinesslicence = files?.bussinesslicence?.[0];

    // ---------- Multilingual validation ----------
    const nameCheck = validateRequiredMultilingual(companyName);
    if (!nameCheck.ok) {
      const missingEn = prettyLangList(nameCheck.missing, "en");
      const missingAm = prettyLangList(nameCheck.missing, "am");

      return res.status(StatusCodes.BAD_REQUEST).json({
        Message_en: `Company name is required in: ${missingEn}.`,
        Message_am: `የኩባንያው ስም በሚከተሉት ቋንቋዎች ያስፈልጋል፦ ${missingAm}።`,
        field: "companyName",
        missingLanguages: nameCheck.missing,
      });
    }

    const addressCheck = validateRequiredMultilingual(supplierAddress);
    if (!addressCheck.ok) {
      const missingEn = prettyLangList(addressCheck.missing, "en");
      const missingAm = prettyLangList(addressCheck.missing, "am");

      return res.status(StatusCodes.BAD_REQUEST).json({
        Message_en: `Supplier address is required in: ${missingEn}.`,
        Message_am: `የአቅራቢው አድራሻ በሚከተሉት ቋንቋዎች ያስፈልጋል፦ ${missingAm}።`,
        field: "supplierAddress",
        missingLanguages: addressCheck.missing,
      });
    }

    if (!owner) {
      return res.status(StatusCodes.BAD_REQUEST).json(owner_name_required);
    }
    if (!companyPhone) {
      return res.status(StatusCodes.BAD_REQUEST).json(company_phone_required);
    }
    if (!companyemail) {
      return res.status(StatusCodes.BAD_REQUEST).json(company_email_required);
    }
    if (!bussinesslicence) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(bussiness_licence_require);
    }

    // ---------- Normalize scalars ----------
    const trimmedEmail = companyemail.trim();
    const trimmedPhone = companyPhone.trim();

    if (trimmedEmail.includes(" ")) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_emailspace_format());
    }
    if (!validator.isEmail(trimmedEmail)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_email_format_invalid);
    }

    // ---------- Duplicate checks ----------
    const findEmail = await supplierModel.findOne({
      companyemail: trimmedEmail,
    });
    if (findEmail) {
      // companyName is now an object — pick .en for the message
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_email_duplicate(companyName.en));
    }

    const PhoneNumberResult = validateAndNormalizeEthiopianPhone(trimmedPhone);
    if (PhoneNumberResult.status === error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(PhoneNumberResult.wrongPhoneMsg);
    }
    const normalizedPhone = PhoneNumberResult.normalized;

    const findPhone = await supplierModel.findOne({
      companyPhone: normalizedPhone,
    });
    if (findPhone) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(user_phone_duplicate(normalizedPhone));
    }

    // ---------- Save business licence ----------
    let savedFilePath = "";

    try {
      savedFilePath = await validateAndSaveFile(bussinesslicence, {
        folder: "SupplierLicence",
        allowedMimeTypes: [
          "image/jpeg",
          "image/JPEG",
          "image/jpg",
          "image/JPG",
          "image/png",
          "image/PNG",
        ],
        maxSizeMB: pictureSize,
      });
    } catch (err) {
      const payLoad = err?.payLoad || {
        Message_en: err?.message || "Invalid file",
        Message_am: `ልክ ያልሆነ የተጠቃሚ ምስል ቅርጸት እባክዎ እንደገና ይሞክሩ። መተግበሪያው '.jpeg'፣ '.jpg' ወይም '.png' ብቻ ይቀበላል። መተግበሪያው ከ ${pictureSize} የሚበልጡ ምስሎችን አይቀበልም።`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(payLoad);
    }

    // ---------- Create ----------
    const supplierData = await supplierModel.create({
      companyName, // ✅ object { en, am }
      owner,
      companyPhone: normalizedPhone, // ✅ save normalized
      bussinesslicence: savedFilePath, // ✅ save the saved path, not the file object
      companyemail: trimmedEmail,
      supplierAddress, // ✅ object { en, am }
      createdBy: requesterId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json(Supplier_info_created(supplierData?.companyName?.en));
  } catch (error) {
    console.log("Error in creating supplier", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let { page = 1, limit = 10, search, owner, createdBy, lang } = req.query;

    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};

    // Filter by owner (only if valid ObjectId)
    if (owner && mongoose.isValidObjectId(owner)) {
      filter.owner = owner;
    }

    // Filter by createdBy
    if (createdBy && mongoose.isValidObjectId(createdBy)) {
      filter.createdBy = createdBy;
    }

    // Multilingual search across all language keys
    if (search && search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");

      // If lang is provided, search only in that language
      // Otherwise, search across all languages
      if (lang) {
        filter.$or = [
          { [`companyName.${lang}`]: regex },
          { [`supplierAddress.${lang}`]: regex },
        ];
      } else {
        filter.$or = [
          { "companyName.en": regex },
          { "companyName.am": regex },
          { "supplierAddress.en": regex },
          { "supplierAddress.am": regex },
          { companyemail: regex },
          { companyPhone: regex },
        ];
      }
    }

    // -------- Query --------
    const [suppliers, total] = await Promise.all([
      supplierModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("owner", "name email") // optional
        .populate("createdBy", "name email") // optional
        .lean(),
      supplierModel.countDocuments(filter),
    ]);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: suppliers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in getting all suppliers", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getSupplierById = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;

    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { id } = req?.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(invalid_supplier_id);
    }

    const supplier = await supplierModel.findById({ _id: id });
    if (!supplier) {
      return res.status(StatusCodes.NOT_FOUND).json(supplier_not_found);
    }

    return res.status(StatusCodes.OK).json(supplier);
  } catch (error) {
    console.log("Error in getting suppplier by id", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updateSupplier = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { supplierId } = req?.params;
    if (!supplierId || !mongoose.isValidObjectId(supplierId)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_id);
    }

    const existing = await supplierModel.findById(supplierId);
    if (!existing) {
      return res.status(StatusCodes.NOT_FOUND).json(supplier_not_found);
    }

    const fields = req?.formFields || {};
    const files = req?.formFiles || {};

    // ---------- Extract incoming multilingual (may be partial) ----------
    const incomingName = extractMultilingual(fields, "companyName");
    const incomingAddress = extractMultilingual(fields, "supplierAddress");

    // ---------- Merge with existing ----------
    const mergedName = mergeMultilingual(existing.companyName, incomingName);
    const mergedAddress = mergeMultilingual(
      existing.supplierAddress,
      incomingAddress,
    );

    // ---------- Validate after merge ----------
    const errors = [];

    const nameCheck = validateRequiredMultilingual(mergedName);
    if (!nameCheck.ok) {
      errors.push(buildMultilingualError("companyName", nameCheck.missing));
    }

    const addressCheck = validateRequiredMultilingual(mergedAddress);
    if (!addressCheck.ok) {
      errors.push(
        buildMultilingualError("supplierAddress", addressCheck.missing),
      );
    }

    // ---------- Scalar fields ----------
    const owner = fields?.owner?.[0];
    const companyPhone = fields?.companyPhone?.[0];
    const companyemail = fields?.companyemail?.[0];
    const bussinesslicenceFile = files?.bussinesslicence?.[0];

    // ---------- Email validation ----------
    let trimmedEmail = existing.companyemail;
    if (companyemail !== undefined) {
      trimmedEmail = companyemail.trim();

      if (trimmedEmail.includes(" ")) {
        errors.push({ field: "companyemail", ...user_emailspace_format() });
      } else if (!validator.isEmail(trimmedEmail)) {
        errors.push({ field: "companyemail", ...user_email_format_invalid });
      } else {
        const dupEmail = await supplierModel.findOne({
          companyemail: trimmedEmail,
          _id: { $ne: supplierId }, // exclude self
        });
        if (dupEmail) {
          errors.push({
            field: "companyemail",
            ...user_email_duplicate(mergedName.en),
          });
        }
      }
    }

    // ---------- Phone validation ----------
    let normalizedPhone = existing.companyPhone;
    if (companyPhone !== undefined) {
      const phoneResult = validateAndNormalizeEthiopianPhone(
        companyPhone.trim(),
      );
      if (phoneResult.status === error) {
        errors.push({ field: "companyPhone", ...phoneResult.wrongPhoneMsg });
      } else {
        normalizedPhone = phoneResult.normalized;
        const dupPhone = await supplierModel.findOne({
          companyPhone: normalizedPhone,
          _id: { $ne: supplierId },
        });
        if (dupPhone) {
          errors.push({
            field: "companyPhone",
            ...user_phone_duplicate(normalizedPhone),
          });
        }
      }
    }

    // ---------- Owner validation ----------
    if (owner !== undefined && !mongoose.isValidObjectId(owner)) {
      errors.push({ field: "owner", ...owner_name_required });
    }

    // ---------- Bail if any errors ----------
    if (errors.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        Message_en: "Validation failed. Please check the fields below.",
        Message_am: "ማረጋገጫ አልተሳካም። እባክዎ ከታች ያሉትን መስኮች ያስተካክሉ።",
        errors,
      });
    }

    // ---------- Save new licence file (optional) ----------
    let savedFilePath = existing.bussinesslicence;
    if (bussinesslicenceFile) {
      try {
        savedFilePath = await validateAndSaveFile(bussinesslicenceFile, {
          folder: "SupplierLicence",
          allowedMimeTypes: [
            "image/jpeg",
            "image/JPEG",
            "image/jpg",
            "image/JPG",
            "image/png",
            "image/PNG",
          ],
          maxSizeMB: pictureSize,
        });
        // TODO: delete the old file if you want to avoid orphans
        // await deleteFile(existing.bussinesslicence);
      } catch (err) {
        const payLoad = err?.payLoad || {
          Message_en: err?.message || "Invalid file",
          Message_am: `ልክ ያልሆነ የተጠቃሚ ምስል ቅርጸት እባክዎ እንደገና ይሞክሩ።`,
        };
        return res.status(StatusCodes.BAD_REQUEST).json(payLoad);
      }
    }

    // ---------- Build update payload (only touched fields) ----------
    const update = {
      companyName: mergedName,
      supplierAddress: mergedAddress,
      companyemail: trimmedEmail,
      companyPhone: normalizedPhone,
      bussinesslicence: savedFilePath,
    };

    if (owner !== undefined) update.owner = owner;
    // Note: don't touch `createdBy` on update — it's an audit field.

    const updated = await supplierModel.findByIdAndUpdate(
      supplierId,
      { $set: update },
      { new: true, runValidators: true },
    );

    return res
      .status(StatusCodes.OK)
      .json(Supplier_info_updated(updated?.companyName?.en));
  } catch (error) {
    console.log("Error in updating supplier", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const requesterId = req?.user?.id || req?.user?._id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const { supplierId } = req?.params;
    if (!supplierId || !mongoose.isValidObjectId(supplierId)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_id);
    }

    const existing = await supplierModel.findById(supplierId);
    if (!existing) {
      return res.status(StatusCodes.NOT_FOUND).json(supplier_not_found);
    }

    const deleted = await supplierModel.findByIdAndDelete(existing);

    return re.status(StatusCodes.OK).json(deleted_supplier(existing?.name));
  } catch (error) {
    console.log("Error in deleting supplier", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
