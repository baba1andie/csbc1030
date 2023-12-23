const { Sequelize } = require("sequelize");
require("dotenv").config();

const createSequelizeInstance = () => {
  const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

  return new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    dialect: "mysql",
  });
};

module.exports = createSequelizeInstance;