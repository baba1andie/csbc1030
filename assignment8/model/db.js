
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment7', 'root', 'Your Password'// Your Password of MySQL
, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;