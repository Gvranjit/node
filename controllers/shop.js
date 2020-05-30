const Product = require("../models/product.js");
const Cart = require("../models/cart");
const products = new Product();
// const cart = new Cart();

exports.getProducts = (req, res, next) => {
     Product.fetchAll()
          .then(([rows]) => {
               res.render("shop/product-list", {
                    prods: rows,
                    pageTitle: "Products",
                    path: "product-list",
               });
          })
          .catch((err) => {
               console.log(err);
          });
};

exports.getCart = (req, res, next) => {
     Cart.fetchAll((cartProducts) => {
          Product.fetchAll((products) => {
               updatedCartProducts = [];
               for (cartProduct of cartProducts.products) {
                    updatedCartProduct = products.find(
                         (p) => p.id == cartProduct.id
                    );
                    if (updatedCartProduct) {
                         updatedCartProducts.push({
                              product: updatedCartProduct,
                              qty: cartProduct.qty,
                         });
                    }
               }
               console.log(updatedCartProducts);
               console.log(cartProducts.totalPrice);
               res.render("shop/cart", {
                    pageTitle: "Cart",
                    path: "cart",
                    prods: updatedCartProducts,
                    totalPrice: cartProducts.totalPrice,
               });
          });
     });
};

exports.postCart = (req, res, next) => {
     const productId = req.body.productId;
     Product.findById(productId, (product) => {
          Cart.addProduct(productId, product.price);
     });
     res.redirect("/product-list");
};

exports.removeFromCart = (req, res, next) => {
     const productId = req.params.productId;
     // const price = req.body.productPrice; // this looks like a dirty wway of solving it. so finding another way below.
     Product.findById(productId, (product) => {
          const productPrice = product.price;
          Cart.deleteById(productId, productPrice);
          res.redirect("/cart");
     });
};
exports.getCheckout = (req, res, next) => {
     res.render("shop/checkout", {
          pageTitle: "Checkout",
          path: "checkout",
     });
};
exports.getProductDetail = (req, res, next) => {
     const productId = req.params.productId;
     Product.findById(productId)
          .then(([product]) => {
               res.render("shop/product-detail", {
                    product: product[0],
                    pageTitle: "Product Detail",
                    path: "product-list",
               });
          })
          .catch((err) => console.log(err));
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
