const User = require("../../models/User/UserModel");
const Group = require("../../models/Group/GroupModel");
const Permission = require("../../models/Permission/PermissionModel");
const PermissionCategory = require("../../models/PermissionCategory/PermissionCategoryModel");

const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const {
  server_error,
  not_authorized,
  invalid_request,
  inactive_active_type,
  group_name_required,
  group_name_exists,
  group_created_successfully,
  group_list_notfound,
  invalid_name_search,
  group_singlelist_notfound,
  group_updated_successfully,
  invalid_listor_prms,
  list_ofPrms_required,
  no_content,
} = require("../../utils/responseLang");

const { getPrmsLstOfUsrs } = require("../../utils/getUsersPrms");

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const createGroup = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let name = req?.body?.name;
    let lstOfPrms = req?.body?.lstOfPrms;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json(group_name_required);
    }

    name = name?.trim()?.toLowerCase();

    const existing = await Group.findOne({ name });
    if (existing) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(group_name_exists(name?.toLocaleUpperCase()));
    }

    let permissionIds = [];
    if (Array.isArray(lstOfPrms)) {
      permissionIds = lstOfPrms;
    } else if (typeof lstOfPrms === "string") {
      try {
        const parsed = JSON.parse(lstOfPrms);
        if (!Array.isArray(parsed)) {
          return res.status(StatusCodes.BAD_REQUEST).json(list_ofPrms_required);
        }
        permissionIds = parsed;
      } catch {
        return res.status(StatusCodes.BAD_REQUEST).json(list_ofPrms_required);
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(list_ofPrms_required);
    }

    permissionIds = Array.from(
      new Set(permissionIds.filter(Boolean).map((id) => id.toString())),
    ).filter((id) => mongoose.isValidObjectId(id));

    if (permissionIds.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(list_ofPrms_required);
    }

    const foundPerms = await Permission.find({
      _id: { $in: permissionIds },
    }).select("_id");
    const foundSet = new Set(foundPerms.map((p) => p._id.toString()));
    if (foundSet.size !== permissionIds.length) {
      return res.status(StatusCodes.NOT_FOUND).json(invalid_listor_prms);
    }

    const createdGrp = await Group.create({
      name,
      lstOfPrms: permissionIds,
      createdBy: requesterId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json(group_created_successfully(createdGrp?.name?.toLocaleUpperCase()));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllGroupsWithOutPrm = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllGroups = await Group.find()
      .populate({
        path: "lstOfPrms",
        select: "name",
      })
      .populate({
        path: "createdBy",
        select: "fullname email position",
      });

    if (!findAllGroups) {
      return res.status(StatusCodes.NOT_FOUND).json(group_list_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllGroups);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllGroups = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllGroups = await Group.find()
      .populate({
        path: "lstOfPrms",
        select: "name",
      })
      .populate({
        path: "createdBy",
        select: "fullname email position",
      });

    if (!findAllGroups) {
      return res.status(StatusCodes.NOT_FOUND).json(group_list_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllGroups);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getGroups = async (req, res) => {
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

    const query = {};

    if (name) {
      name = name?.trim()?.toLowerCase();
      try {
        const sanitized = escapeRegex(name);
        query.name = { $regex: sanitized, $options: "i" };
      } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_name_search);
      }
    }

    if (status) {
      query.status = status;
    }

    const totalGroups = await Group.countDocuments(query);

    const totalPages = Math.ceil(totalGroups / limit);

    if (page > totalPages) {
      page = 1;
    }

    const skip = (page - 1) * limit;

    const findGroups = await Group.find(query)
      .sort({ createdAt: sortBy, _id: sortBy })
      .skip(skip)
      .limit(limit)
      .populate([
        { path: "createdBy", select: "fullname email position" },
        { path: "lstOfPrms", select: "name" },
      ]);

    if (!findGroups) {
      return res.status(StatusCodes.NOT_FOUND).json(group_list_notfound);
    }

    return res.status(StatusCodes.OK).json({
      groups: findGroups,
      totalGroups,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getGroup = async (req, res) => {
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
      code_name: { $in: ["get_groups", "get_group"] },
    });

    const getAllGroups = permissions?.find(
      (item) => item?.code_name === "get_groups",
    );
    const getAllGroupsString = getAllGroups?._id?.toString();

    const getSingleGroups = permissions?.find(
      (item) => item?.code_name === "get_group",
    );
    const getSingleGroupsString = getSingleGroups?._id?.toString();

    const userPermissionStrings = userPermissions?.map((perm) =>
      perm?.toString(),
    );

    const hasAllPrms = userPermissionStrings?.includes(getAllGroupsString);
    const hasSinglePrm = userPermissionStrings?.includes(getSingleGroupsString);

    if (userRole === "no" && !hasAllPrms && !hasSinglePrm) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findGrps = await Group.findOne({ _id: id }).populate([
      { path: "createdBy", select: "fullname email position" },
      { path: "lstOfPrms", select: "name" },
    ]);

    if (!findGrps) {
      return res.status(StatusCodes.NOT_FOUND).json(group_singlelist_notfound);
    }

    return res.status(StatusCodes.OK).json(findGrps);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updateGroup = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findGrps = await Group.findOne({ _id: id });

    if (!findGrps) {
      return res.status(StatusCodes.NOT_FOUND).json(group_singlelist_notfound);
    }

    let name = req?.body?.name;
    let lstOfPermissions = req?.body?.lstOfPrms || [];
    const status = req?.body?.status;

    const updatedFields = {};

    if (name) {
      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json(group_name_required);
      }
      name = name.trim().toLowerCase();

      const existsByName = await Group.findOne({
        name,
        _id: { $ne: id },
      });
      if (existsByName) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(group_name_exists(name?.toLocaleUpperCase()));
      }

      updatedFields.name = name;
    }

    if (lstOfPermissions) {
      let permissionIds = [];

      if (Array.isArray(lstOfPermissions)) {
        permissionIds = lstOfPermissions;
      } else if (typeof lstOfPermissions === "string") {
        try {
          const parsed = JSON.parse(lstOfPermissions);
          if (!Array.isArray(parsed)) {
            return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
          }
          permissionIds = parsed;
        } catch {
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
        }
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
      }

      permissionIds = permissionIds
        .filter(Boolean)
        .filter((pid) => mongoose.isValidObjectId(pid))
        .map((pid) => pid.toString());

      permissionIds = Array.from(new Set(permissionIds));

      if (permissionIds.length > 0) {
        const foundPerms = await Permission.find({
          _id: { $in: permissionIds },
        }).select("_id");

        const foundSet = new Set(foundPerms.map((p) => p._id.toString()));

        updatedFields.lstOfPrms = Array.from(foundSet);
      } else {
        updatedFields.lstOfPrms = [];
      }
    }

    if (status) {
      if (status !== "active" && status !== "inactive") {
        return res.status(StatusCodes.FORBIDDEN).json(inactive_active_type);
      }
      updatedFields.status = status;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(StatusCodes.OK).json(no_content);
    }

    const updatedGrp = await Group.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true },
    );

    if (!updatedGrp) {
      return res.status(StatusCodes.NOT_FOUND).json(group_singlelist_notfound);
    }

    return res
      .status(StatusCodes.OK)
      .json(group_updated_successfully(updatedGrp?.name?.toLocaleUpperCase()));
  } catch (error) {
    console.log("error in updating group", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getGroupAnalytics = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const totalNumOfGroup = await Group.countDocuments();
    const numOfActiveGroup = await Group.countDocuments({ status: "active" });
    const numOfInActiveGroup = await Group.countDocuments({
      status: "inactive",
    });

    const usersPerGroup = await Group.aggregate([
      {
        $lookup: {
          from: "usermodels",
          localField: "_id",
          foreignField: "group",
          as: "users",
        },
      },
      {
        $addFields: {
          userCount: { $size: "$users" },
        },
      },
      {
        $project: {
          name: 1,
          status: 1,
          userCount: 1,
        },
      },
    ]);

    return res.status(StatusCodes.OK).json({
      totalNumOfGroup,
      numOfActiveGroup,
      numOfInActiveGroup,
      usersPerGroup,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const filterPermissionCategoriesWithPermissions = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.OK).json([]);
    }

    const categories = await PermissionCategory.find({})
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    if (!categories || !categories.length) {
      return res.status(StatusCodes.OK).json([]);
    }

    const categoryIds = categories.map((cat) => cat._id);

    const permFilter = {
      category: { $in: categoryIds },
    };

    const perms = await Permission.find(permFilter)
      .select("_id name code_name category")
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    const permMap = {};
    for (const p of perms) {
      const key = p.category.toString();
      if (!permMap[key]) permMap[key] = [];
      permMap[key].push({
        _id: p?._id,
        name: p?.name,
        code_name: p?.code_name,
      });
    }

    const result = categories
      .map((cat) => ({
        perm_category_id: cat?._id?.toString(),
        perm_category: cat.name,
        perms: permMap[cat._id.toString()] || [],
      }))
      .filter((cat) => Array.isArray(cat.perms) && cat.perms.length > 0);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.OK).json([]);
  }
};

module.exports = {
  createGroup,
  getAllGroupsWithOutPrm,
  getAllGroups,
  getGroups,
  getGroup,
  updateGroup,
  getGroupAnalytics,
  filterPermissionCategoriesWithPermissions,
};
