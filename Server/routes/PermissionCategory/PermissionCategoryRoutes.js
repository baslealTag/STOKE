const express = require("express");
const router = express.Router();

const checkTokenExpiration  = require("../../middlewares/verifyToken");
const auditLogMiddleware    = require("../../middlewares/userLogMiddleware");
const apiKeyMiddleware       = require("../../middlewares/checkKey");
const { checkFullPermission, checkOrPermissions } = require("../../middlewares/permissions");

const {
  createPermissionCategory,
  getAllPermissionsCategoriesWithOutPrm,
  getAllPermissionCategories,
  getPermissionCategories,
  getPermissionCategory,
  updatePermissionCategory,
  dltPermissionCategory,
} = require("../../controllers/PermissionCategory/PermissionCategoryController");

// POST /nfd_api/permcategory_api/create
router.post(
  "/create",
  apiKeyMiddleware("GET_CRPERMCATEGORY_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["permcategory_create"]),
  createPermissionCategory
);

// PUT /nfd_api/permcategory_api/update/:id
router.put(
  "/update/:id",
  apiKeyMiddleware("GET_UPDPERMCATEGORY_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["permcategory_update"]),
  updatePermissionCategory
);

// DELETE /nfd_api/permcategory_api/delete/:id
router.delete(
  "/delete/:id",
  apiKeyMiddleware("GET_DLTPERMCATEGORY_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["permcategory_delete"]),
  dltPermissionCategory
);

// GET /nfd_api/permcategory_api/all_no_prm
router.get(
  "/all_no_prm",
  apiKeyMiddleware("GET_GALLPERMCATEGORY_API"),
  checkTokenExpiration,
  checkOrPermissions(["permcategory_view", "permcategory_admin"]),
  getAllPermissionsCategoriesWithOutPrm
);

// GET /nfd_api/permcategory_api/all
router.get(
  "/all",
  apiKeyMiddleware("GET_GALLPERMCATEGORY_API"),
  checkTokenExpiration,
  checkOrPermissions(["permcategory_view", "permcategory_admin"]),
  getAllPermissionCategories
);

// GET /nfd_api/permcategory_api/categories  – filtered/paginated
router.get(
  "/categories",
  apiKeyMiddleware("GET_GALLPERMCATEGORY_API"),
  checkTokenExpiration,
  checkOrPermissions(["permcategory_view", "permcategory_admin"]),
  getPermissionCategories
);

// GET /nfd_api/permcategory_api/category/:id
router.get(
  "/category/:id",
  apiKeyMiddleware("GET_GPERMCATEGORY_API"),
  checkTokenExpiration,
  checkOrPermissions(["permcategory_view", "permcategory_admin"]),
  getPermissionCategory
);

module.exports = router;
