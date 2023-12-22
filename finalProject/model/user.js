// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconnect');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_suite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_geo_lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_geo_lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_catchPhrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_bs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'user',
  timestamps: false,
});

module.exports = User;

// Define associations or sync the model in another file
