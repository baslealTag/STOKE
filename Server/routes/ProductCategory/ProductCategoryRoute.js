const express = require("express");
const {
  checkOrPermissions,
  checkFullPermission,
} = require("../../middlewares/permissions");
const {
  CreateProductCategory,
  UpdateProductCategory,
  getProductCategories,
  getProductCategoryById,
  deleteProductCategory,
} = require("../../controllers/ProductCategory/ProductCategoryController");
const apiKeyMiddleware = require("../../middlewares/checkKey");
const checkTokenExpiration = require("../../middlewares/verifyToken");
const router = express.Router();

router.route("/create_product_category").post(
  checkTokenExpiration,
  checkOrPermissions(
    "create_product_category",
    "create_product_category_as_admin",
  ),

  apiKeyMiddleware("GET_PRODCATEGORY_API"),

  CreateProductCategory,
);

router
  .route("/update/product_ategory/:id")
  .put(
    checkTokenExpiration,
    checkOrPermissions(
      "update_product_category",
      "update_product_category_as_admin",
    ),
    apiKeyMiddleware("GET_UPDATEPRODCATE_API"),
    UpdateProductCategory,
  );

router.route("/get_product_category").get(
  checkTokenExpiration,
  checkFullPermission(["get_product_category", "update_product_category"]),
  apiKeyMiddleware("GET_PRODUCTCATEGORY_API"),

  getProductCategories,
);

router
  .route("/get/product/category/:id")
  .get(
    checkTokenExpiration,
    checkFullPermission(["get_product_category", "get_product_cata_asadmin"]),
    apiKeyMiddleware("GET_PRODUCTCATEGORYBYID_API"),
    getProductCategoryById,
  );

router
  .route("/delete/product_category")
  .delete(
    checkTokenExpiration,
    checkFullPermission([
      "delete_product_category",
      "delete_product_cat_asadmin",
    ]),
    apiKeyMiddleware("GET_DELETEPRODUCTCATEGORY_API"),
    deleteProductCategory,
  );

module.exports = router;
