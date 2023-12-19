const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const User = sequelize.define("userData", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps:false
});

module.exports = User;