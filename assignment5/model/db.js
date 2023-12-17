// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment_7', 'root', 'cuTy4#29@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;