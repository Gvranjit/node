const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
     static addProduct(id, price) {
          //fetch
          //analyze
          //add new.
          fs.readFile(p, (err, fileContent) => {
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
               fs.writeFile(p, JSON.stringify(cart), (err) => {
                    console.log(err);
               });
          });
     }
};
