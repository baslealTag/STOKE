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
  createGroup,
  getAllGroupsWithOutPrm,
  getAllGroups,
  getGroups,
  getGroup,
  updateGroup,
  getGroupAnalytics,
  filterPermissionCategoriesWithPermissions,
} = require("../../controllers/Group/GroupController");

// POST /nfd_api/group_api/create
router.post(
  "/create",
  apiKeyMiddleware("GET_CRGROUP_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["group_create"]),
  createGroup,
);

// PUT /nfd_api/group_api/update/:id
router.put(
  "/update/:id",
  apiKeyMiddleware("GET_UPDGROUP_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["group_update"]),
  updateGroup,
);

// GET /nfd_api/group_api/all_no_prm  – lightweight list (no permission overhead)
router.get(
  "/all_no_prm",
  apiKeyMiddleware("GET_GALLGROUPS_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_view", "group_admin"]),
  getAllGroupsWithOutPrm,
);

// GET /nfd_api/group_api/all
router.get(
  "/all",
  apiKeyMiddleware("GET_GALLGROUPS_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_view", "group_admin"]),
  getAllGroups,
);

// GET /nfd_api/group_api/groups  – filtered/paginated
router.get(
  "/groups",
  apiKeyMiddleware("GET_GALLGROUPS_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_view", "group_admin"]),
  getGroups,
);

// GET /nfd_api/group_api/group/:id
router.get(
  "/group/:id",
  apiKeyMiddleware("GET_GSINGLEGROUP_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_view", "group_admin"]),
  getGroup,
);

// GET /nfd_api/group_api/analytics
router.get(
  "/analytics",
  apiKeyMiddleware("GET_ANLYGROUP_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_analytics", "group_admin"]),
  getGroupAnalytics,
);

// GET /nfd_api/group_api/permissions_tree  – permission category + permission tree for the group form
router.get(
  "/permissions_tree",
  apiKeyMiddleware("GET_GALLGROUPS_API"),
  checkTokenExpiration,
  checkOrPermissions(["group_view", "group_admin"]),
  filterPermissionCategoriesWithPermissions,
);

module.exports = router;
