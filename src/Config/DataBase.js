const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  user: process.env.DATABASE_USER,
  host: process.env.HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

module.exports = {
  execute: (...params) => mysqlPool.execute(...params),
  mysqlPool,
};
