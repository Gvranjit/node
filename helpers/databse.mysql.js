const mysql = require("mysql2");
const pool = mysql.createPool({
     host: "localhost",
     user: "root",
     database: "node-complete", //this is the schema we created
     password: "lovely",
});

module.exports = pool.promise();
