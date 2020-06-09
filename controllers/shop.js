const Product = require("../models/product.js");
const Cart = require("../models/cart");
// const products = new Product();
// const cart = new Cart();

exports.getProducts = (req, res, next) => {
     Product.findAll()
          .then((products) => {
               res.render("./shop/product-list", {
                    pageTitle: "Product List",
                    prods: products,
                    path: "product-list",
               });
          })
          .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
     req.user
          .getCart()
          .then((cart) => {
               return cart.getProducts();
          })
          .then((products) => {
               console.log(products[1].title);
               res.render("shop/cart", {
                    pageTitle: "Cart",
                    path: "cart",
                    prods: products,
                    totalPrice: 1,
               });
          })
          .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
     const productId = req.body.productId;
     let fetchedCart;
     req.user
          .getCart()
          .then((cart) => {
               fetchedCart = cart;
               return cart.getProducts({
                    where: {
                         id: productId,
                    },
               });
          })
          .then((products) => {
               let product;
               if (products.length > 0) {
                    product = products[0];
               }
               let newQuantity = 1;
               if (product) {
                    console.log("Old quantity:", product.cartItem.qty);
                    product.cartItem.qty += 1;
                    console.log("New quantity:", product.cartItem.qty);
                    return product.cartItem.save();
               }
               return Product.findByPk(productId)
                    .then((product) => {
                         console.log("TEst", newQuantity);
                         return fetchedCart.addProduct(product, {
                              through: { qty: newQuantity },
                         });
                    })
                    .then(() => {
                         res.redirect("/cart");
                    })
                    .catch((err) => console.log(err));
          })

          .catch((err) => console.log(err));
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
     Product.findAll({
          where: {
               id: productId,
          },
     })
          .then((product) => {
               res.render("shop/product-detail", {
                    product: product[0],
                    pageTitle: "Product Detail",
                    path: "product-list",
               });
          })
          .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
     Product.findAll()
          .then((products) => {
               res.render("./shop/index", {
                    pageTitle: "Product List",
                    prods: products,
                    path: "product-list",
               });
          })
          .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
     res.render("shop/orders", {
          pageTitle: "Your Orders",
          path: "orders",
     });
};

//.console.log(adminData.products);
