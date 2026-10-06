const PermissionCategory = require("../../models/PermissionCategory/PermissionCategoryModel");

const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const {
  category_name_required,
  category_name_duplicate,
  permission_category_created,
  category_list_notfound,
  invalid_name_search,
  invalid_request,
  category_singlelist_notfound,
  category_name_exists,
  inactive_active_type,
  category_updated_successfully,
  server_error,
  not_authorized,
  category_conflict,
  category_deleted,
  no_content,
} = require("../../utils/responseLang");
const PermissionModel = require("../../models/Permission/PermissionModel");

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const createPermissionCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let name = req?.body?.name;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json(category_name_required);
    }

    name = name?.trim()?.toLowerCase();

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json(category_name_required);
    }

    const findPermissionCategory = await PermissionCategory.findOne({
      name: name,
    });

    if (findPermissionCategory) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(category_name_duplicate(name));
    }

    await PermissionCategory.create({
      name,
      createdBy: requesterId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json(permission_category_created(name));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllPermissionsCategoriesWithOutPrm = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllPrmsCategory = await PermissionCategory.find().populate({
      path: "createdBy",
      select: "fullname email position",
    });

    if (!findAllPrmsCategory) {
      return res.status(StatusCodes.NOT_FOUND).json(category_list_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllPrmsCategory);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllPermissionCategories = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllPrmsCategory = await PermissionCategory.find().populate({
      path: "createdBy",
      select: "fullname email position",
    });

    if (!findAllPrmsCategory) {
      return res.status(StatusCodes.NOT_FOUND).json(category_list_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllPrmsCategory);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getPermissionCategories = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let page = parseInt(req?.query?.page) || 1;
    let limit = parseInt(req?.query?.limit) || 5;
    let sortBy = parseInt(req?.query?.sort) || -1;
    let name =
      typeof req?.query?.name === "string" ? req.query.name.trim() : "";

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0) {
      limit = 5;
    }
    if (sortBy !== 1 && sortBy !== -1) {
      sortBy = -1;
    }

    const query = {};

    if (name) {
      try {
        name = name?.trim();
        const sanitizedName = escapeRegex(name);
        query.name = { $regex: sanitizedName, $options: "i" };
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_name_search);
      }
    }

    const totalPermissionCategories =
      await PermissionCategory.countDocuments(query);

    const totalPages = Math.ceil(totalPermissionCategories / limit);

    if (page > totalPages) {
      page = 1;
    }

    const skip = (page - 1) * limit;

    const findPermissionCategory = await PermissionCategory.find(query)
      .sort({
        createdAt: sortBy,
        _id: sortBy,
      })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "createdBy",
        select: "fullname email position",
      });

    if (!findPermissionCategory) {
      return res.status(StatusCodes.NOT_FOUND).json(category_list_notfound);
    }

    return res.status(StatusCodes.OK).json({
      permissionCategories: findPermissionCategory,
      totalPermissionCategories,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getPermissionCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findPermissionCategory = await PermissionCategory.findOne({
      _id: id,
    }).populate({
      path: "createdBy",
      select: "fullname email position",
    });

    if (!findPermissionCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(category_singlelist_notfound);
    }

    const permissions = await PermissionModel.find({ category: id })
      .select("name code_name")
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    const permissionNames = permissions.map((p) => p?.name);

    return res.status(StatusCodes.OK).json({
      permissionCategory: findPermissionCategory,
      permissions: permissionNames,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updatePermissionCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findPermissionCategory = await PermissionCategory.findOne({
      _id: id,
    });

    if (!findPermissionCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(category_singlelist_notfound);
    }

    let name = req?.body?.name ? req?.body?.name?.trim() : "";

    const updatedFields = {};

    if (name) {
      name = name?.toLowerCase();

      const findPermissionName = await PermissionCategory.findOne({
        name: name,
        _id: { $ne: id },
      });

      if (findPermissionName) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(category_name_exists(name));
      }

      updatedFields.name = name;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(StatusCodes.OK).json(no_content);
    }

    const updatePrmCategory = await PermissionCategory.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true },
    );

    if (!updatePrmCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(category_singlelist_notfound);
    }

    return res
      .status(StatusCodes.OK)
      .json(
        category_updated_successfully(
          updatePrmCategory?.name?.toLocaleUpperCase(),
        ),
      );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const dltPermissionCategory = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findPermissionCategory = await PermissionCategory.findOne({
      _id: id,
    });

    if (!findPermissionCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(category_singlelist_notfound);
    }

    const findPrms = await PermissionModel.findOne({
      category: id,
    });

    if (findPrms) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(
          category_conflict(
            findPrms?.name?.toLocaleUpperCase(),
            findPermissionCategory?.name?.toLocaleUpperCase(),
          ),
        );
    }

    await findPermissionCategory.deleteOne({ _id: id });

    return res
      .status(StatusCodes.OK)
      .json(
        category_deleted(findPermissionCategory?.name?.toLocaleUpperCase()),
      );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  createPermissionCategory,
  getAllPermissionsCategoriesWithOutPrm,
  getAllPermissionCategories,
  getPermissionCategories,
  getPermissionCategory,
  updatePermissionCategory,
  dltPermissionCategory,
};
