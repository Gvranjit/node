const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");
const pathCart = path.join(rootDir, "data", "cart.json");
const pathProducts = path.join(rootDir, "data", "products.json");
const Product = require("./product");

function getProdcutsFromCart(p, cb) {
     fs.readFile(p, (err, fileContent) => {
          if (err) {
               cb({});
          }
          if (!err) {
               cb(JSON.parse(fileContent));
          }
     });
}

module.exports = class Cart {
     static fetchAll(products) {
          console.log(pathCart);
          fs.readFile(pathCart, (err, fileContent) => {
               if (err) {
                    products(null);
               } else {
                    products(JSON.parse(fileContent)); // callback function to send back the  products object which is in the cart
               }
          });
     }

     static deleteById(id, price) {
          getProdcutsFromCart(pathCart, (products) => {
               if (products.products.length > 0) {
                    console.log("Total price", products.totalPrice);
                    const deleteProduct = products.products.find(
                         (p) => p.id == id
                    );
                    if (!deleteProduct) {
                         console.log(
                              'THE DELETED PRODUCT WASN"T FOUND IN CART'
                         );
                         return;
                    }
                    console.log(
                         "Quantity:",
                         deleteProduct.qty,
                         " and price for each ",
                         price
                    );
                    products.totalPrice -= price * deleteProduct.qty;
                    const updatedProducts = products.products.filter(
                         (products) => products.id !== id
                    );
                    products.products = updatedProducts;
                    fs.writeFile(pathCart, JSON.stringify(products), (err) => {
                         console.log(err);
                    });
               } else {
                    console.log("this was executed... the else statement");
                    return;
               }
               console.log(products);
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
