const express = require("express");
const {
  createweight,
  getWeights,
  getWeightById,
  updateWeight,
  deleteWeight,
} = require("../../controllers/WeightType/WeightTypeController");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const {
  checkFullPermission,
  checkOrPermissions,
} = require("../../middlewares/permissions");

const router = express.Router();

router.post(
  "/create_weight",
  apiKeyMiddleware("GET_CRWEIGHT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["weight_create", "weight_admin"]),

  createweight,
);

router.get(
  "/get_weight",
  apiKeyMiddleware("GET_GALLWEIGHT_API"),
  checkTokenExpiration,
  checkOrPermissions(["weight_view", "weight_admin"]),

  getWeights,
);

router.get(
  "/get_weight/:id",
  apiKeyMiddleware("GET_GSINGLEWEIGHT_API"),
  checkTokenExpiration,
  checkOrPermissions(["weight_view", "weight_admin"]),

  getWeightById,
);

router.put(
  "/update_weight/:id",
  apiKeyMiddleware("GET_UPDWEIGHT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["weight_update", "weight_admin"]),

  updateWeight,
);
router.delete(
  "/delete_weight/:id",
  apiKeyMiddleware("GET_DELWEIGHT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["weight_delete", "weight_admin"]),

  deleteWeight,
);

module.exports = router;
