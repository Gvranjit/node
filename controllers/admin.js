const Product = require("../models/product.js");
const products = new Product();

exports.getAddProduct = (req, res, next) => {
     // console.log('In the add-product middleware');
     res.render("admin/edit-product", {
          pageTitle: "Add Products",
          path: "add-product",
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
     res.redirect("/admin/edit-product");
};
exports.getEditProduct = (req, res, next) => {
     // console.log('In the add-product middleware');
     const editMode = req.query.edit;

     if (!editMode) {
          console.log("Invalid query! ");
          return res.redirect("/");
     }
     console.log(editMode);
     let productId = req.params.productId;
     Product.findById(productId, (product) => {
          if (!product) {
               console.log("No products found ! ");
               return res.redirect("/");
          }
          res.render("admin/edit-product", {
               pageTitle: productId,
               path: "edit-product",
               editMode: editMode,
               product: product,
          });
     });
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
