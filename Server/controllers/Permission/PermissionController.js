const User = require("../../models/User/UserModel");
const Permission = require("../../models/Permission/PermissionModel");
const PermissionCategory = require("../../models/PermissionCategory/PermissionCategoryModel");

const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const {
  server_error,
  not_authorized,
  permission_name_required,
  permission_codename_required,
  permission_category_required,
  permission_already_exists,
  permission_codename_exists,
  category_singlelist_notfound,
  category_inactive,
  permission_created_successfully,
  permission_list_notfound,
  invalid_request,
  permission_singlelist_notfound,
  inactive_active_type,
  permission_updated_successfully,
  invalid_name_search,
  no_content,
} = require("../../utils/responseLang");

const { getPrmsLstOfUsrs } = require("../../utils/getUsersPrms");

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const createPermission = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let name = req?.body?.name;
    let codeName = req?.body?.code_name;
    const category = req?.body?.category;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json(permission_name_required);
    }
    if (!codeName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(permission_codename_required);
    }
    if (!category || !mongoose.isValidObjectId(category)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(permission_category_required);
    }

    name = name?.trim()?.toLowerCase();
    codeName = codeName?.trim()?.toLowerCase();

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json(permission_name_required);
    }
    if (!codeName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(permission_codename_required);
    }

    const findExistingPrmName = await Permission.findOne({ name: name });

    if (findExistingPrmName) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(permission_already_exists(name?.toLocaleUpperCase()));
    }

    const findExistingCodeName = await Permission.findOne({
      code_name: codeName,
    });

    if (findExistingCodeName) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(permission_codename_exists(codeName?.toLocaleUpperCase()));
    }

    const findExistingPrmCategory = await PermissionCategory.findOne({
      _id: category,
    });

    if (!findExistingPrmCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(category_singlelist_notfound);
    }

    await Permission.create({
      name,
      code_name: codeName,
      category,
      createdBy: requesterId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json(permission_created_successfully(name?.toLocaleUpperCase()));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllPermissionsWithOutPrm = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllPrms = await Permission.find().populate([
      {
        path: "createdBy",
        select: "fullname email position",
      },
      { path: "category", select: "name" },
    ]);

    if (!findAllPrms) {
      return res.status(StatusCodes.NOT_FOUND).json(permission_list_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllPrms);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllPrms = await Permission.find().populate([
      {
        path: "createdBy",
        select: "fullname email position",
      },
      { path: "category", select: "name" },
    ]);

    if (!findAllPrms) {
      return res.status(StatusCodes.NOT_FOUND).json(permission_list_notfound);
    }

    return res.status(StatusCodes.OK).json({ permissions: findAllPrms });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getPermissions = async (req, res) => {
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
    let status = req?.query?.status || "";
    let category = req?.query?.category || null;

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0) {
      limit = 5;
    }
    if (sortBy !== 1 && sortBy !== -1) {
      sortBy = -1;
    }
    if (status === "" || status === null) {
      status = "";
    }

    if (!category) {
      category = null;
    }

    if (category) {
      if (!category || !mongoose.isValidObjectId(category)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
      }

      const findPrmCategory = await PermissionCategory.findOne({
        _id: category,
      });

      if (!findPrmCategory) {
        category = null;
      }
    }

    const query = {};

    if (name) {
      name = name?.trim()?.toLowerCase();

      try {
        const sanitizedName = escapeRegex(name);
        query.name = { $regex: sanitizedName, $options: "i" };
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_name_search);
      }
    }

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    const totalPermissions = await Permission.countDocuments(query);

    const totalPages = Math.ceil(totalPermissions / limit);

    if (page > totalPages) {
      page = 1;
    }

    const skip = (page - 1) * limit;

    const findPermissions = await Permission.find(query)
      .sort({
        createdAt: sortBy,
        _id: sortBy,
      })
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "createdBy",
          select: "fullname email position",
        },
        { path: "category", select: "name" },
      ]);

    if (!findPermissions) {
      return res.status(StatusCodes.NOT_FOUND).json(permission_list_notfound);
    }

    return res.status(StatusCodes.OK).json({
      permissions: findPermissions,
      totalPermissions,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getPermission = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findRequestingUsr = await User.findOne({ _id: requesterId });

    if (!findRequestingUsr) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const userRole = findRequestingUsr.isSuperAdmin;
    const userPermissions = await getPrmsLstOfUsrs(requesterId);

    const permissions = await Permission.find({
      code_name: { $in: ["get_perms", "get_perm"] },
    });

    const getAllPrms = permissions?.find(
      (item) => item?.code_name === "get_perms",
    );
    const getAllPrmsString = getAllPrms?._id?.toString();

    const getSinglePrms = permissions?.find(
      (item) => item?.code_name === "get_perm",
    );
    const getSinglePrmsString = getSinglePrms?._id?.toString();

    const userPermissionStrings = userPermissions?.map((perm) =>
      perm?.toString(),
    );

    const hasAllPrms = userPermissionStrings?.includes(getAllPrmsString);
    const hasSinglePrm = userPermissionStrings?.includes(getSinglePrmsString);

    if (userRole === "no" && !hasAllPrms && !hasSinglePrm) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findPrms = await Permission.findOne({ _id: id }).populate([
      {
        path: "createdBy",
        select: "fullname email position",
      },
      { path: "category", select: "name" },
    ]);

    if (!findPrms) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(permission_singlelist_notfound);
    }

    return res.status(StatusCodes.OK).json(findPrms);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getSelfPermission = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findUserPerm = await User.findOne({ _id: requesterId }).populate({
      path: "group",
      select: "lstOfPrms",
    });

    if (!findUserPerm) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const userPermissions = findUserPerm?.group?.lstOfPrms || [];

    const groupPermissions = await Permission.find({
      _id: { $in: userPermissions },
    });

    const additionalPermissions = await Permission.find({
      _id: { $in: findUserPerm?.addPrms },
    });

    const restrictedPermissions = await Permission.find({
      _id: { $in: findUserPerm?.restrictedPrms },
    });

    const allPermissions = [...groupPermissions, ...additionalPermissions];

    const uniquePermissions = allPermissions?.filter(
      (perm, index, self) =>
        index ===
        self.findIndex((p) => p?._id?.toString() === perm?._id?.toString()),
    );

    const finalPermissions = uniquePermissions?.filter(
      (perm) =>
        !restrictedPermissions.some(
          (restricted) => restricted?._id?.toString() === perm?._id?.toString(),
        ),
    );

    const userPermissionLst = finalPermissions?.map((perm) => perm?._id);

    const findListOfPerm = await Permission.find({
      _id: { $in: userPermissionLst },
    }).select("code_name name category");

    return res.status(StatusCodes.OK).json(findListOfPerm);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updatePermissions = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findPrms = await Permission.findOne({ _id: id });

    if (!findPrms) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(permission_singlelist_notfound);
    }

    let name = req?.body?.name;
    let codeName = req?.body?.code_name;
    const category = req?.body?.category;

    const updatedFields = {};

    if (category) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
      }

      const findPrmCategory = await PermissionCategory.findOne({
        _id: category,
      });
      if (!findPrmCategory) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(category_singlelist_notfound);
      }

      updatedFields.category = category;
    }
    if (name) {
      name = name?.trim()?.toLowerCase();

      const existsByName = await Permission.findOne({
        name,
        _id: { $ne: id },
      });
      if (existsByName) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(permission_already_exists(name?.toLocaleUpperCase()));
      }

      updatedFields.name = name;
    }

    if (codeName) {
      codeName = codeName?.trim()?.toLowerCase();

      if (!codeName) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(permission_codename_required);
      }

      const existsByCode = await Permission.findOne({
        code_name: codeName,
        _id: { $ne: id },
      });

      if (existsByCode) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(permission_codename_exists(codeName?.toLocaleUpperCase()));
      }

      updatedFields.code_name = codeName;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(StatusCodes.OK).json(no_content);
    }

    const updatedPerm = await Permission.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true },
    );

    if (!updatedPerm) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(permission_singlelist_notfound);
    }

    return res
      .status(StatusCodes.OK)
      .json(
        permission_updated_successfully(updatedPerm?.name?.toLocaleUpperCase()),
      );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  createPermission,
  getAllPermissionsWithOutPrm,
  getAllPermissions,
  getPermissions,
  getPermission,
  getSelfPermission,
  updatePermissions,
};
