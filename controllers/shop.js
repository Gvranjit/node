const Product = require("../models/product.js");
const Cart = require("../models/cart");
const products = new Product();
// const cart = new Cart();

exports.getProducts = (req, res, next) => {
     Product.fetchAll((products) => {
          res.render("shop/product-list", {
               prods: products,
               pageTitle: "Products",
               path: "product-list",
          });
     });
};

exports.getCart = (req, res, next) => {
     res.render("shop/cart", {
          pageTitle: "Cart",
          path: "cart",
     });
};

exports.postCart = (req, res, next) => {
     const productId = req.body.productId;
     Product.findById(productId, (product) => {
          Cart.addProduct(productId, product.price);
     });
     res.redirect("/");
};
exports.getCheckout = (req, res, next) => {
     res.render("shop/checkout", {
          pageTitle: "Checkout",
          path: "checkout",
     });
};
exports.getProductDetail = (req, res, next) => {
     const productId = req.params.productId;
     Product.findById(productId, (product) => {
          console.log(product);
          res.render("shop/product-detail", {
               product: product,
               pageTitle: "Product Detail",
               path: "product-list",
          });
     });
     // res.render("shop/product-detail", {
     //      pageTitle: "Product Details",
     //      path: "product-detail",
     // });
};
exports.getIndex = (req, res, next) => {
     res.render("shop/index", {
          pageTitle: "Product Details",
          path: "shop",
     });
};
exports.getOrders = (req, res, next) => {
     res.render("shop/orders", {
          pageTitle: "Your Orders",
          path: "orders",
     });
};

//.console.log(adminData.products);
