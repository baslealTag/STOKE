const express = require("express");
const router = express.Router();

const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const {
  checkFullPermission,
  checkOrPermissions,
} = require("../../middlewares/permissions");

const {
  createUser,
  loginUser,
  logoutUser,
  changeUsrPwd,
  getAllUsersWithOutPrm,
  getAllUsers,
  getUsers,
  getUser,
  forgotPassword,
  resetPassword,
  adminPswReset,
  updateUsers,
  getUserAnalytics,
  changeSelfPassword,
  deleteUser,
  filterPermissionCategoriesWithPermissionsForUsers,
  groupFilters,
} = require("../../controllers/User/UserController");

// ── Public / Auth ────────────────────────────────────────────────────────────

// POST /nfd_api/user_api/login_user

router.delete(
  "/delete_user/:id",
  apiKeyMiddleware("GET_DELUSER_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["user_delete"]),
  deleteUser,
);

router.post(
  "/login_user",
  apiKeyMiddleware("GET_LGUSER_API"),
  auditLogMiddleware,
  loginUser,
);

// POST /nfd_api/user_api/logout_user
router.post(
  "/logout_user",
  apiKeyMiddleware("GET_LGUSER_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  logoutUser,
);

// POST /nfd_api/user_api/forget_password
router.post(
  "/forget_password",
  apiKeyMiddleware("GET_FORGUSRPWD_API"),
  auditLogMiddleware,
  forgotPassword,
);

// POST /nfd_api/user_api/reset_password
router.post(
  "/reset_password",
  apiKeyMiddleware("GET_RESETUSRPWD_API"),
  auditLogMiddleware,
  resetPassword,
);

// PATCH /nfd_api/user_api/change_pwd  – first-login password change (no permission check)
router.post(
  "/change_pwd",
  apiKeyMiddleware("GET_CHPWDUSR_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  changeUsrPwd,
);

// PATCH /nfd_api/user_api/change_self_pwd  – authenticated user changes own password
router.post(
  "/change_self_pwd",
  apiKeyMiddleware("GET_CHPWDUSR_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  changeSelfPassword,
);

// ── Admin CRUD ───────────────────────────────────────────────────────────────

// POST /nfd_api/user_api/create_user
router.post(
  "/create_user",
  (req, res, next) => {
    console.log("1. before checkTokenExpiration");
    next();
  },
  checkTokenExpiration,
  (req, res, next) => {
    console.log("2. passed checkTokenExpiration");
    next();
  },
  auditLogMiddleware,
  (req, res, next) => {
    console.log("3. passed auditLogMiddleware");
    next();
  },
  apiKeyMiddleware("GET_CRUSER_API"),
  (req, res, next) => {
    console.log("4. passed apiKeyMiddleware");
    next();
  },
  checkFullPermission(["user_create", "user_update"]),
  (req, res, next) => {
    console.log("5. passed checkFullPermission");
    next();
  },
  createUser,
);

router.get(
  "group_filters",
  checkTokenExpiration,

  apiKeyMiddleware("GET_ALLUSRS_API"),
  checkOrPermissions([
    "create_users_as_orgadmin",
    "create_users_as_superadmin",
    "create_users",
    "update_user",
    "update_all_users_as_superadmin",
    "update_users_as_orgadmin",
    "get_users",
    "get_user",
    "get_all_users_as_superadmin",
    "get_users_as_orgadmin",
  ]),
  groupFilters,
);

// PATCH /nfd_api/user_api/admin_reset/:id  – admin resets a user's password
router.put(
  "/admin_reset/:id",
  apiKeyMiddleware("GET_USRADMRESET_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["user_admin_reset"]),
  adminPswReset,
);

// PUT /nfd_api/user_api/update_user/:id
router.put(
  "/update_user/:id",
  apiKeyMiddleware("GET_UPDUSR_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["user_update"]),
  updateUsers,
);

// ── Read / List ──────────────────────────────────────────────────────────────

// GET /nfd_api/user_api/all_users_no_prm  – lightweight list (no permission filter)
router.get(
  "/all_users_no_prm",
  apiKeyMiddleware("GET_ALLUSRS_API"),
  checkTokenExpiration,
  checkOrPermissions(["user_view", "user_admin"]),
  getAllUsersWithOutPrm,
);

// GET /nfd_api/user_api/all_users  – full list with permissions
router.get(
  "/all_users",
  apiKeyMiddleware("GET_ALLUSRS_API"),
  checkTokenExpiration,
  checkOrPermissions(["user_view", "user_admin"]),
  getAllUsers,
);

// GET /nfd_api/user_api/users  – filtered/paginated list
router.get(
  "/users",
  apiKeyMiddleware("GET_USRS_API"),
  checkTokenExpiration,
  checkOrPermissions(["user_view", "user_admin"]),
  getUsers,
);

// GET /nfd_api/user_api/user/:id
router.get(
  "/user/:id",
  apiKeyMiddleware("GET_USR_API"),
  checkTokenExpiration,
  checkOrPermissions(["user_view", "user_admin"]),
  getUser,
);

// GET /nfd_api/user_api/analytics
router.get(
  "/analytics",
  apiKeyMiddleware("GET_USRANALYTICS_API"),
  checkTokenExpiration,
  checkOrPermissions(["user_analytics", "user_admin"]),
  getUserAnalytics,
);

// GET /nfd_api/user_api/self_permissions  – returns permission categories for the logged-in user
router.get(
  "/self_permissions",
  apiKeyMiddleware("GET_SELFPERM_API"),
  checkTokenExpiration,
  filterPermissionCategoriesWithPermissionsForUsers,
);

module.exports = router;
