const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "your_database",
});

module.exports = { sequelize };
