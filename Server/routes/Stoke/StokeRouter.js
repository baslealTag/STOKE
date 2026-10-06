const express = require("express");
const {
  deleteStoke,
  updateStoke,
  getStokeById,
  getAllStokes,
  createStoke,
} = require("../../controllers/Stoke/SrokeController");
const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const {
  checkOrPermissions,
  checkFullPermission,
} = require("../../middlewares/permissions");

const router = express.Router();

router.post(
  "/create_stoke",
  apiKeyMiddleware("GET_CRWARESTOKE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["create_stoke"]),

  createStoke,
);

router.get(
  "/get_stoke",
  apiKeyMiddleware("GET_GALLSTOKE_API"),
  checkTokenExpiration,
  checkOrPermissions(["stoke_view", "stoke_admin"]),

  getAllStokes,
);

router.get(
  "/get_stoke/:id",
  apiKeyMiddleware("GET_GSINGLESTOKE_API"),
  checkTokenExpiration,
  checkOrPermissions(["stoke_view", "stoke_admin"]),

  getStokeById,
);

router.put(
  "/update/stoke/:id",
  apiKeyMiddleware("GET_UPDSTOKE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["stoke_update", "stoke_admin"]),

  updateStoke,
);
router.delete(
  "/delete/stoke",
  apiKeyMiddleware("GET_DELSTOKE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["stoke_delete"]),

  deleteStoke,
);

module.exports = router;
