const Product = require("../models/product.js");
const products = new Product();

exports.getAddProduct = (req, res, next) => {
     // console.log('In the add-product middleware');
     res.render("admin/edit-product", {
          pageTitle: "Add Products",
          path: "add-product",
          editMode: "false",
     });
};

exports.postAddProduct = (req, res, next) => {
     console.log(req.body);
     req.user
          .createProduct({
               title: req.body.title,
               price: req.body.price,
               imageUrl: req.body.imageUrl,
               description: req.body.description,
               //userId: req.user.id,
          })

          .then(() => {
               res.redirect("/admin/add-product");
          })
          .catch((err) => console.log(err));
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

     req.user
          .getProducts({
               where: {
                    id: productId,
               },
          })

          .then((products) => {
               if (!products[0]) {
                    console.log("No products found ! ");
                    return res.redirect("/admin/admin-product-list");
               }
               res.render("admin/edit-product", {
                    pageTitle: productId,
                    path: "edit-product",
                    editMode: editMode,
                    product: products[0],
               });
          })
          .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
     const productId = req.body.productId;
     const updatedTitle = req.body.title;
     const updatedPrice = req.body.price;
     const updatedDescription = req.body.description;
     const updatedImageUrl = req.body.imageUrl;
     const updatedProduct = new Product(
          productId,
          updatedTitle,
          updatedImageUrl,
          updatedDescription,
          updatedPrice
     );
     Product.findByPk(productId)
          .then((product) => {
               product.title = updatedTitle;
               product.price = updatedPrice;
               product.imageUrl = updatedImageUrl;
               product.description = updatedDescription;
               return product.save();
          })
          .then(() => res.redirect("/admin/admin-product-list"))
          .catch((err) => console.log(err));

     // /
};

exports.postDeleteProduct = (req, res, next) => {
     const productId = req.params.productId;
     // const productPrice = req.body.productPrice;
     // since the above is a dirty method,this is not preferable
     req.user
          .getProducts({
               where: {
                    id: productId,
               },
          })

          .then((products) => {
               const product = products[0];
               return product.destroy();
          })
          .then(() => res.redirect("/admin/admin-product-list"))
          .catch((err) => console.log(err));
};
// exports.getAddedProduct = (req, res, next) => {
//      res.render("admin/added-product");
// };

exports.getAdminProductList = (req, res, next) => {
     req.user
          .getProducts()
          .then((products) => {
               res.render("admin/admin-product-list", {
                    prods: products,
                    pageTitle: "Admin panel Products",
                    path: "admin-product-list",
               });
          })
          .catch((err) => console.log(err));
};
