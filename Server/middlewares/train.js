const UserModel = require("../models/User/UserModel");

async function geteffectivePermissionCodes(userId) {
  const findUser = await UserModel.findById(userId)
    .populate({ path: "group", select: "lstOfPrms" })
    .lean();

  if (!findUser) {
    return {
      error: "not_found",
    };
  }

  if (findUser.hasChangedPwd === "no") {
    return {
      error: "must_change_password",
    };
  }

  if (findUser.isSuperAdmin === "yes") {
    return {
      codes: null,
      superAdmin: true,
    };
  }

  const Groups = Array.isArray(findUser.group)
    ? findUser?.group
    : findUser?.group
      ? [findUser.group]
      : [];

  const groupIds = Groups.flatMap((g) =>
    Array.isArray(g?.lstOfPrms) ? g.lstOfPerms : [],
  );

  const addPerms = Array.isArray(findUser.addPrms) ? findUser.addPrms : [];
  const restrictedPermissions = Array.isArray(findUser.restrictedPrms)
    ? findUser.restrictedPrms
    : [];

  const allowedPermissions = new set([...groupIds, ...addPerms]);
}
