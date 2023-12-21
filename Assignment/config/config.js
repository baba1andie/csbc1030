const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('csbc1030', 'Prgya', 'Prgyakapoor@1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;