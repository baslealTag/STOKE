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
  createPermission,
  getAllPermissionsWithOutPrm,
  getAllPermissions,
  getPermissions,
  getPermission,
  getSelfPermission,
  updatePermissions,
} = require("../../controllers/Permission/PermissionController");

// POST /nfd_api/perm_api/create
router.post(
  "/create",
  apiKeyMiddleware("GET_CRPERM_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["permission_create"]),
  createPermission,
);

// PUT /nfd_api/perm_api/update/:id
router.put(
  "/update/:id",
  apiKeyMiddleware("GET_UPDPERM_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["permission_update"]),
  updatePermissions,
);

// GET /nfd_api/perm_api/all_no_prm  – lightweight (no permission overhead)
router.get(
  "/all_no_prm",
  apiKeyMiddleware("GET_GALLPERM_API"),
  checkTokenExpiration,
  checkOrPermissions(["permission_view", "permission_admin"]),
  getAllPermissionsWithOutPrm,
);

// GET /nfd_api/perm_api/all
router.get(
  "/all",
  apiKeyMiddleware("GET_GALLPERM_API"),
  checkTokenExpiration,
  checkOrPermissions(["permission_view", "permission_admin"]),
  getAllPermissions,
);

// GET /nfd_api/perm_api/permissions  – filtered/paginated
router.get(
  "/permissions",
  apiKeyMiddleware("GET_GALLPERM_API"),
  checkTokenExpiration,
  checkOrPermissions(["permission_view", "permission_admin"]),
  getPermissions,
);

// GET /nfd_api/perm_api/permission/:id
router.get(
  "/permission/:id",
  apiKeyMiddleware("GET_GSNGLEPERM_API"),
  checkTokenExpiration,
  checkOrPermissions(["permission_view", "permission_admin"]),
  getPermission,
);

// GET /nfd_api/perm_api/self  – returns the calling user's own effective permissions
router.get(
  "/self",
  apiKeyMiddleware("GET_SELFPERM_API"),
  checkTokenExpiration,
  getSelfPermission,
);

module.exports = router;
