const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("finalProject", "local_user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
