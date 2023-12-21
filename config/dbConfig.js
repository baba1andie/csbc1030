const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_database", "root", "Yashdeep@1", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
