const date = new Date();
const fs = require("fs");
const path = require("path");
const Cart = require("./cart.js");
const rootDir = require("../helpers/path");
const p = path.join(rootDir, "data", "products.json");
const getProdcutsFromFile = (cb) => {
     fs.readFile(p, (err, fileContent) => {
          if (err) {
               cb([]);
          }
          if (!err) {
               cb(JSON.parse(fileContent));
          }
     });
};

// let products = [];
module.exports = class Product {
     constructor(id, title, imageUrl, description, price) {
          this.id = id;
          this.title = title;
          this.imageUrl = imageUrl;
          this.price = price;
          this.description = description;
     }
     static delete(productId, productPrice) {
          getProdcutsFromFile((products) => {
               const updatedProducts = products.filter(
                    (prodIndex) => prodIndex.id !== productId
               );
               console.log(updatedProducts);
               fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
               });
               Cart.deleteById(productId, productPrice);
          });
     }
     save() {
          console.log("inside model", this.title);
          getProdcutsFromFile((products) => {
               if (this.id) {
                    const existingProductIndex = products.findIndex(
                         (prodIndex) => {
                              return prodIndex.id == this.id;
                         }
                    );
                    const updatedProducts = [...products];

                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                         console.log(err);
                    });
                    ``;
               } else {
                    this.id = (Math.random() * 100000000).toFixed(0).toString();
                    products.push(this);

                    fs.writeFile(p, JSON.stringify(products), (err) => {
                         console.log(err);
                    });
               }
          });
     }
     static fetchAll(cb) {
          getProdcutsFromFile(cb);
     }

     static findById(id, cb) {
          getProdcutsFromFile((products) => {
               const product = products.find((p) => p.id === id);
               cb(product);
          });
     }
};
