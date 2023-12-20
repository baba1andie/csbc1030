const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("CSBC1030_ASSIGNMENT07", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
