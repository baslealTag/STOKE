const express = require("express");

const checkTokenExpiration = require("../../middlewares/verifyToken");
const auditLogMiddleware = require("../../middlewares/userLogMiddleware");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Product/ProductController");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const {
  checkOrPermissions,
  checkFullPermission,
} = require("../../middlewares/permissions");

const router = express.Router();

router.post(
  "/create_product",
  apiKeyMiddleware("GET_CREPRODUCT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["create_product"]),

  createProduct,
);

router.get(
  "/get_product",
  apiKeyMiddleware("GET_GALLPRODUCT_API"),
  checkTokenExpiration,
  checkOrPermissions(["product_view", "product_admin"]),

  getAllProducts,
);

router.get(
  "/get_product/:id",
  apiKeyMiddleware("GET_GSINGLEPRODUCT_API"),
  checkTokenExpiration,
  checkOrPermissions(["product_view", "product_admin"]),

  getProductById,
);

router.put(
  "/update/product/:id",
  apiKeyMiddleware("GET_UPDPRODUCT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["product_update"]),

  updateProduct,
);
router.delete(
  "/delete/product",
  apiKeyMiddleware("GET_DELPRODUCT_API"),
  checkTokenExpiration,
  auditLogMiddleware,
  checkFullPermission(["product_delete"]),

  deleteProduct,
);

module.exports = router;
