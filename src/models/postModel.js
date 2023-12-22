
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig');

const Post = sequelize.define('Post', {
    // Define your Post model fields here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // address: {
    //     type: DataTypes.JSONB,
    //     allowNull: false,
    // },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // company: {
    //     type: DataTypes.JSONB,
    //     allowNull: false,
    // },
});

module.exports = { Post };
