const express = require("express");

const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../../controllers/Supplier/SupplierController");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const {
  checkFullPermission,
  checkOrPermissions,
} = require("../../middlewares/permissions");

const router = express.Router();

router.post(
  "/create_stoke",
  apiKeyMiddleware("GET_CRWARESTOKE_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["create_supplier"]),

  createSupplier,
);

router.get(
  "/get_stoke",
  apiKeyMiddleware("GET_GALLSTOKE_API"),
  checkTokenExpiration,
  checkOrPermissions(["supplier_view", "supplier_admin"]),

  getAllSuppliers,
);

router.get(
  "/get_stoke/:id",
  apiKeyMiddleware("GET_GSINGLESTOKE_API"),
  checkTokenExpiration,
  checkOrPermissions(["supplier_view", "supplier_admin"]),

  getSupplierById,
);

router.put(
  "/update/supplier/:id",
  apiKeyMiddleware("GET_UPDSUPPLIER_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["supplier_update", "supplier_admin"]),

  updateSupplier,
);
router.delete(
  "/delete/supplier",
  apiKeyMiddleware("GET_DELSUPPLIER_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["supplier_delete", "supplier_admin"]),

  deleteSupplier,
);

module.exports = router;
