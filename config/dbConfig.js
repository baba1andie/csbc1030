const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("class1030", "root", "Nayara@27", {
    host: '127.0.0.1',
    dialect: 'mysql',
});


module.exports = sequelize;