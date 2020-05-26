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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorHandler);

app.listen(port);

// const connect = http.createServer(app);
// log('savetest 2');
// connect.listen(port);
