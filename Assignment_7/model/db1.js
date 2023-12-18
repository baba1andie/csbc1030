const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment_7', 'root', '8587858637', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;