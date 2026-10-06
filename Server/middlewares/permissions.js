const UserModel = require("../models/User/UserModel");
const PermissionModel = require("../models/Permission/PermissionModel");
const responselanguage = require("../utils/responseLang");
const { StatusCodes } = require("http-status-codes");

// Optional: use originalUrl instead of path to avoid router-mount surprises
const SKIP_ROUTES = new Set([
  "/nfd_api/user_api/login_user",
  "/nfd_api/user_api/forget_password",
  "/nfd_api/user_api/reset_password",
  "/nfd_api/user_api/change_pwd",
]);

async function getEffectivePermissionCodes(userId) {
  const findUser = await UserModel.findById(userId)
    .select("hasChangedPwd isSuperAdmin addPrms restrictedPrms group")
    .populate({ path: "group", select: "lstOfPrms" })
    .lean();

  if (!findUser) return { error: "not_found" };
  if (findUser.hasChangedPwd === "no") return { error: "must_change_password" };
  if (findUser.isSuperAdmin === "yes") return { codes: null, superAdmin: true };

  // `group` can be a single ref or an array of refs — normalize to array
  const groups = Array.isArray(findUser.group)
    ? findUser.group
    : findUser.group
      ? [findUser.group]
      : [];

  // Flatten lstOfPrms across every group
  const groupIds = groups.flatMap((g) =>
    Array.isArray(g?.lstOfPrms) ? g.lstOfPrms : [],
  );

  const addIds = Array.isArray(findUser?.addPrms) ? findUser.addPrms : [];
  const restrictedIds = Array.isArray(findUser?.restrictedPrms)
    ? findUser.restrictedPrms
    : [];

  const allowedSet = new Set(
    [...groupIds, ...addIds].map((id) => id?.toString()).filter(Boolean),
  );

  if (allowedSet.size === 0) return { codes: new Set(), superAdmin: false };

  const allowedIds = Array.from(allowedSet);
  const restrictedSet = new Set(
    restrictedIds.map((id) => id?.toString()).filter(Boolean),
  );
  const restrictedArr = Array.from(restrictedSet);

  const perms = await PermissionModel.find({
    _id: { $in: allowedIds, $nin: restrictedArr },
  })
    .select("code_name")
    .lean();

  const codes = new Set(perms.map((p) => p.code_name).filter(Boolean));

  return { codes, superAdmin: false };
}

function buildPermissionMiddleware({ mode }) {
  // mode: "all" (every) or "any" (some)
  return (requiredPermissions) => {
    return async (req, res, next) => {
      try {
        const url = req?.originalUrl || req?.path || "";
        if (SKIP_ROUTES.has(url) || SKIP_ROUTES.has(req?.path)) {
          return next();
        }

        if (!requiredPermissions || !requiredPermissions.length) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(responselanguage?.invalid_request);
        }

        const user = req?.user;
        if (!user?.id) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(
              responselanguage?.not_authorized ||
                responselanguage?.user_not_authorized,
            );
        }

        const result = await getEffectivePermissionCodes(user.id);

        if (result.error === "not_found") {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(responselanguage?.user_account_not_found);
        }

        if (result.error === "must_change_password") {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(responselanguage?.user_must_change_password);
        }

        // Superadmin bypasses the permission check entirely
        if (result.superAdmin) {
          req.effectivePermissions = [];
          req.isSuperAdmin = true;
          return next();
        }

        // Self-access shortcut for "get_user"/"get_users" routes
        if (
          req.params?.id &&
          user?.id &&
          req.params.id.toString() === user.id.toString() &&
          (requiredPermissions.includes("get_users") ||
            requiredPermissions.includes("get_user"))
        ) {
          // Expose permissions even when bypassing
          const codesForSelf = result.codes || new Set();
          req.effectivePermissions = [...codesForSelf];
          return next();
        }

        const codes = result.codes || new Set();

        // Expose resolved permission code names for downstream controllers
        req.effectivePermissions = [...codes];

        const ok =
          mode === "all"
            ? requiredPermissions.every((p) => codes.has(p))
            : requiredPermissions.some((p) => codes.has(p));

        if (!ok) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(responselanguage?.user_not_authorized);
        }

        next();
      } catch (error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(responselanguage?.error_requesting_permission);
      }
    };
  };
}

const checkFullPermission = buildPermissionMiddleware({ mode: "all" });
const checkOrPermissions = buildPermissionMiddleware({ mode: "any" });

module.exports = { checkFullPermission, checkOrPermissions };
