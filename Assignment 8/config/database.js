const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("assignment7", "root", "adi@mysql7", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
