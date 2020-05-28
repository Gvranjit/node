const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");
const pathCart = path.join(rootDir, "data", "cart.json");
const pathProducts = path.join(rootDir, "data", "products.json");
const Product = require("./product");

function getProdcutsFromCart(p, cb) {
     fs.readFile(p, (err, fileContent) => {
          if (err) {
               cb([]);
          }
          if (!err) {
               cb(JSON.parse(fileContent));
          }
     });
}

module.exports = class Cart {
     static fetchAll(Products) {
          console.log(pathCart);

          getProdcutsFromCart(pathCart, (cartProducts) => {
               //Product.findById(cartProducts.id);
               console.log(cartProducts.products);
               const products = [];
               for (let cartProduct of cartProducts.products) {
                    Product.findById(cartProduct.id, (product) => {
                         products.push(product);
                         console.log(product.title);
                    });

                    console.log("this should come first");
               }
               console.log("this should come second.");
          });
     }
     static addProduct(id, price) {
          //fetch
          //analyze
          //add new.
          fs.readFile(pathCart, (err, fileContent) => {
               let cart = { products: [], totalPrice: 0 };

               if (!err) {
                    cart = JSON.parse(fileContent);
               }
               const existingProductIndex = cart.products.findIndex(
                    (prodIndex) => {
                         return prodIndex.id === id;
                    }
               );
               let existingProduct = cart.products[existingProductIndex];
               let updatedProduct = { id: id, qty: 1 };

               if (existingProduct) {
                    updatedProduct = { ...existingProduct };
                    updatedProduct.qty = existingProduct.qty + 1;

                    cart.products[existingProductIndex] = updatedProduct;
               } else {
                    cart.products = [...cart.products, updatedProduct];
               }
               cart.totalPrice = cart.totalPrice + +price;
               fs.writeFile(pathCart, JSON.stringify(cart), (err) => {
                    console.log(err);
               });
          });
     }
};
