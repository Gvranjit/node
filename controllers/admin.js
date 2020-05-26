const Product = require("../models/product.js");
const products = new Product();

exports.getAddProduct = (req, res, next) => {
     // console.log('In the add-product middleware');
     res.render("admin/add-product", {
          pageTitle: "Add Products",
          path: "add-product",
          formsCSS: true,
          productCSS: true,
          activeAddProduct: true,
     });
};

exports.postAddProduct = (req, res, next) => {
     console.log(req.body);
     const product = new Product(
          req.body.title,
          req.body.imageUrl,
          req.body.description,
          req.body.price
     );

     product.save();
     res.redirect("/admin/add-product");
};

exports.getAddedProduct = (req, res, next) => {
     res.render("admin/added-product");
};

exports.getAdminProductList = (req, res, next) => {
     Product.fetchAll((products) => {
          res.render("admin/admin-product-list", {
               prods: products,
               pageTitle: "Admin panel Products",
               path: "admin-product-list",
          });
     });
};
