const date = new Date();
const fs = require("fs");
const path = require("path");
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
     static delete(productId) {
          getProdcutsFromFile((products) => {
               const existingProductIndex = products.findIndex(
                    (prodIndex) => prodIndex.id == productId
               );
               if (products.length == 1) {
                    const updatedProducts = [];
                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                         console.log(err);
                    });
               } else {
                    const updatedProducts = products.splice(
                         existingProductIndex,
                         1
                    );
                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                         console.log(err);
                    });
               }
               console.log(existingProductIndex);

               console.log(
                    "Product",
                    products[existingProductIndex].title,
                    "was deleted "
               );
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
                    console.log(
                         "I REACHED THE DESTINATION THIS TIME ALSO",
                         this
                    );
                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                         console.log(err);
                    });
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
