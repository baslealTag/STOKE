const User = require("../models/User/UserModel");
const Permission = require("../models/Permission/PermissionModel");

// This helps get the list of permission that the user has been granted.
const getPrmsLstOfUsrs = async (userId) => {
  try {
    const findUser = await User.findOne({ _id: userId })
      .populate({
        path: "group",
        select: "lstOfPrms",
      })
      .select("-password");

    const groupPermissions = await Permission.find({
      _id: { $in: findUser?.group?.lstOfPrms },
    });

    const additionalPermissions = await Permission.find({
      _id: { $in: findUser?.addPrms },
    });

    const restrictedPermissions = await Permission.find({
      _id: { $in: findUser?.restrictedPrms },
    });

    const allPermissions = [...groupPermissions, ...additionalPermissions];

    const uniquePermissions = allPermissions?.filter(
      (perm, index, self) =>
        index ===
        self.findIndex((p) => p?._id?.toString() === perm?._id?.toString())
    );

    const finalPermissions = uniquePermissions?.filter(
      (perm) =>
        !restrictedPermissions.some(
          (restricted) => restricted?._id?.toString() === perm?._id?.toString()
        )
    );

    const userPermissions = finalPermissions?.map((perm) => perm?._id);

    return Array.isArray(userPermissions) ? userPermissions : [];
  } catch (error) {
    console.error(
      "Error in getting user's list of permission:",
      error?.message
    );
    return [];
  }
};

// This means the user must have all of the permissions listed in permissionsIds.
const getLstOfUsrsWithPrms = async (permissions) => {
  try {
    const users = await User.find()
      .populate({
        path: "group",
        select: "lstOfPrms",
      })
      .select("-password");

    const findPrmsNames = await Permission.find({
      code_name: { $in: permissions },
    });

    const permissionsIds = findPrmsNames?.map((item) => item?._id);

    const usersWithPermissions = users?.filter((user) => {
      if (user?.isSuperAdmin === "yes") {
        return false;
      }

      if (user?.status === "inactive") {
        return false;
      }

      const groupPermissions = user?.group?.lstOfPrms || [];
      const additionalPermissions = user?.addPrms || [];
      const restrictedPermissions = user?.restrictedPrms || [];

      const allPermissions = [...groupPermissions, ...additionalPermissions];

      const uniquePermissions = allPermissions?.filter(
        (perm, index, self) =>
          index === self?.findIndex((p) => p?.toString() === perm?.toString())
      );

      const finalPermissions = uniquePermissions?.filter(
        (perm) =>
          !restrictedPermissions.some(
            (restricted) => restricted?.toString() === perm?.toString()
          )
      );

      const userPermissions = finalPermissions?.map((perm) => perm);

      const userPermissionLst = userPermissions?.map((item) =>
        item?.toString()
      );

      const hasAllPermissions = permissionsIds?.every((perm) =>
        userPermissionLst?.includes(perm?.toString())
      );

      return hasAllPermissions;
    });

    const usersWithPermissionLst = usersWithPermissions?.map(
      (item) => item?._id
    );

    return Array.isArray(usersWithPermissionLst) ? usersWithPermissionLst : [];
  } catch (error) {
    console.error(
      "Error in getting user's list of permission:",
      error?.message
    );
    return [];
  }
};

// This means the user must have at least one of the permissions in permissionsIds
const getLstOfUsrsWithSinglePrms = async (permissions) => {
  try {
    const users = await User.find()
      .populate({
        path: "group",
        select: "lstOfPrms",
      })
      .select("-password");

    const findPrmsNames = await Permission.find({
      code_name: { $in: permissions },
    });

    const permissionsIds = findPrmsNames?.map((item) => item?._id);

    const usersWithPermissions = users?.filter((user) => {
      if (user?.isSuperAdmin === "yes") {
        return false;
      }

      if (user?.status === "inactive") {
        return false;
      }

      const groupPermissions = user?.group?.lstOfPrms || [];
      const additionalPermissions = user?.addPrms || [];
      const restrictedPermissions = user?.restrictedPrms || [];

      const allPermissions = [...groupPermissions, ...additionalPermissions];

      const uniquePermissions = allPermissions?.filter(
        (perm, index, self) =>
          index === self?.findIndex((p) => p?.toString() === perm?.toString())
      );

      const finalPermissions = uniquePermissions?.filter(
        (perm) =>
          !restrictedPermissions.some(
            (restricted) => restricted?.toString() === perm?.toString()
          )
      );

      const userPermissions = finalPermissions?.map((perm) => perm);

      const userPermissionLst = userPermissions?.map((item) =>
        item?.toString()
      );

      const hasAllPermissions = permissionsIds?.some((perm) =>
        userPermissionLst?.includes(perm?.toString())
      );

      return hasAllPermissions;
    });

    const usersWithPermissionLst = usersWithPermissions?.map(
      (item) => item?._id
    );

    return Array.isArray(usersWithPermissionLst) ? usersWithPermissionLst : [];
  } catch (error) {
    console.error(
      "Error in getting user's list of permission:",
      error?.message
    );
    return [];
  }
};

module.exports = {
  getPrmsLstOfUsrs,
  getLstOfUsrsWithPrms,
  getLstOfUsrsWithSinglePrms,
};
