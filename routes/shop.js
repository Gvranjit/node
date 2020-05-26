const path = require("path");
const rootDir = require("../helpers/path.js");

const shopController = require("../controllers/shop.js");

const express = require("express");
const router = express.Router();

router.get("/product-list", shopController.getProducts);

// router.get("product/delete", )

router.get("/products/:productId", shopController.getProductDetail);

router.get("/checkout", shopController.getCheckout);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/", shopController.getIndex);

router.get("/orders", shopController.getOrders);

module.exports = router;
