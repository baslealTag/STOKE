const express = require("express");

const apiKeyMiddleware = require("../../middlewares/checkKey");
const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const {
  checkFullPermission,
  checkOrPermissions,
} = require("../../middlewares/permissions");
const {
  createWareHouse,
  getWarehouses,
  getWareHouseById,
  updateWareHouse,
  deleteWareHouse,
} = require("../../controllers/Warehouses/WarehousesController");

const router = express.Router();

router.post(
  "/create_warehouse",
  apiKeyMiddleware("GET_CRWAREHOUSE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["create_warehouse"]),

  createWareHouse,
);

router.get(
  "/get_warehouse",
  apiKeyMiddleware("GET_GALLWAREHOUSE_API"),
  checkTokenExpiration,
  checkOrPermissions(["warehouse_view", "warehouse_admin"]),

  getWarehouses,
);

router.get(
  "/get_warehouse/:id",
  apiKeyMiddleware("GET_GSINGLEWAREHOUSE_API"),
  checkTokenExpiration,
  checkOrPermissions(["warehouse_view", "warehouse_admin"]),

  getWareHouseById,
);

router.put(
  "/update/warehouse/:id",
  apiKeyMiddleware("GET_UPDWAREHOUSE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["warehouse_update", "warehouse_admin"]),

  updateWareHouse,
);
router.delete(
  "/delete/warehouse/:id",
  apiKeyMiddleware("GET_DELWAREHOUSE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["warehouse_delete", "warehouse_admin"]),

  deleteWareHouse,
);

module.exports = router;
