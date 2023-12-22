// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('final_project', 'root', 'cuTy4#29@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;