const path = require("path");

const express = require("express");

const router = express.Router();

const rootDir = require("../helpers/path");

const adminController = require("../controllers/admin.js");

const products = [];

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.get("/added-product", adminController.getAddedProduct);

router.get("/admin-product-list", adminController.getAdminProductList);

module.exports = router;
