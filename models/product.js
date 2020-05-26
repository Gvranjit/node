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
     constructor(title, imageUrl, description, price) {
          this.title = title;
          this.imageUrl = imageUrl;
          this.price = price;
          this.description = description;
     }
     save() {
          this.id = (Math.random() * 100000000).toFixed(0).toString();
          getProdcutsFromFile((products) => {
               products.push(this);

               fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
               });
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
