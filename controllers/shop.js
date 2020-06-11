const Product = require("../models/product.js");
const Cart = require("../models/cart");
const { get } = require("../routes/shop.js");
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
     let prods = [];
     req.user
          .getCart()
          .then((cart) => {
               return cart.getProducts();
          })
          .then((products) => {
               if (products[0]) prods = products;
               //console.log(products[0].title);
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
     let fetchedCart;
     req.user
          .getCart()
          .then((cart) => {
               fetchedCart = cart;
               console.log(req.body.productId);
               return cart.getProducts({ where: { id: req.body.productId } });
          })
          .then((cartProduct) => {
               if (cartProduct.length > 0) {
                    console.log(cartProduct[0].cartItem.qty);
                    cartProduct[0].cartItem.qty += 1;
                    return cartProduct[0].cartItem.save();
               } else {
                    console.log("I reached the ELSE blcok");
                    return Product.findByPk(req.body.productId)
                         .then((product) => {
                              console.log("hahahahaahahah");
                              return fetchedCart.addProduct(product, { through: { qty: 1 } });
                         })
                         .catch((err) => console.log(err));
               }
          })
          .then((result) => {
               res.redirect("/product-list");
          })
          .catch((err) => console.log);

     // const productId = req.body.productId;
     // let fetchedCart;
     // req.user
     //      .getCart()
     //      .then((cart) => {
     //           fetchedCart = cart;
     //           return cart.getProducts({
     //                where: {
     //                     id: productId,
     //                },
     //           });
     //      })
     //      .then((products) => {
     //           let product;
     //           if (products.length > 0) {
     //                product = products[0];
     //           }
     //           let newQuantity = 1;
     //           if (product) {
     //                console.log("Old quantity:", product.cartItem.qty);
     //                product.cartItem.qty += 1;
     //                console.log("New quantity:", product.cartItem.qty);
     //                return product.cartItem.save();
     //           }
     //           return Product.findByPk(productId)
     //                .then((product) => {
     //                     console.log("TEst", newQuantity);
     //                     return fetchedCart.addProduct(product, {
     //                          through: { qty: newQuantity },
     //                     });
     //                })
     //                .then(() => {
     //                     res.redirect("/cart");
     //                })
     //                .catch((err) => console.log(err));
     //      })

     //      .catch((err) => console.log(err));
};

exports.removeFromCart = (req, res, next) => {
     const productId = req.params.productId;
     let fetchedCart;
     // const price = req.body.productPrice; // this looks like a dirty wway of solving it. so finding another way below.
     req.user
          .getCart()
          .then((cart) => {
               fetchedCart = cart;
               return cart.getProducts({ where: { id: productId } });
          })
          .then((product) => {
               return fetchedCart.removeProduct(product[0]);
          })
          .then((result) => {
               res.redirect("/cart");
          })
          .catch((err) => console.log(err));
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
     req.user
          .getOrders({ include: ["products"] })
          .then((orders) => {
               res.render("shop/orders", {
                    pageTitle: "Your Orders",
                    path: "orders",
                    orders: orders,
               });
          })
          .then((orders) => {
               // console.log("**********************************************", products);
          })
          .catch((err) => console.log(err));
};

exports.postCreateOrder = (req, res, next) => {
     let fetchedCart;
     let products;
     req.user
          .getCart()
          .then((cart) => {
               fetchedCart = cart;
               return cart.getProducts();
          })
          .then((cartProducts) => {
               products = cartProducts;
               return req.user.createOrder();
          })
          .then((order) => {
               console.log("****************************************************");
               console.log("****************************************************");
               return order.addProducts(
                    products.map((product) => {
                         console.log(product.id);
                         product.orderItem = { qty: 1 };
                         return product;
                    })
               );
          })
          .then((result) => {
               return fetchedCart.setProducts(null);
          })
          .then((result) => {
               res.redirect("/orders");
          })
          .catch((err) => console.log(err));
};

//.console.log(adminData.products);
