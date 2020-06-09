const log = require("./logger"); // my own external logger function
//const http = require('http');
const path = require("path");
// const router = require('./router');
const { port } = require("./config.json");

//third party modules
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views"); //First one is the reserved option and second is the value of folder

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorHandler = require("./routes/error");
const sequelize = require("./helpers/database");

const Product = require("./models/product");

const User = require("./models/user");

const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
     User.findByPk(1)
          .then((user) => {
               req.user = user;
               next();
          })
          .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorHandler);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); //optional as one direction is enough.
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
sequelize
     .sync({})
     .then((result) => {
          //  /console.log(result);
          return User.findByPk(1);
     })
     .then((user) => {
          if (!user) {
               User.create({ name: "Code", email: "code@craftnepal.host" });
          }
          return user;
     })
     .then((user) => {
          //console.log(user);
          return user.getCart().then((cart) => {
               if (!cart) {
                    return user.createCart();
               }
               return cart;
          });
     })
     .then((cart) => {})
     .then(() => {
          app.listen(port);
     })
     .catch((err) => console.log(err));
