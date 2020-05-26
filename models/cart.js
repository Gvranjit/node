const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
     static addProduct(id) {
          //fetch
          //analyze
          //add new.
         fs.readFile(p, (err, fileContent) => {
             let cart = { products: [], totalPrice=0 };

             if (!err) {
                 cart = JSON.parse(fileContent);
             }
             const existingProduct = cart.products.find(p => {
                 return(p.id === id);

             })
             if (existingProduct) {
                 cart.products.push(existingProduct);
                 cart.totalPrice += existingProduct.price;
                 fs.writeFile(p,JSON.stringify(cart));
             }

         }
        )
     }
};
