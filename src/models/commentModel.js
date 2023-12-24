const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig'); // Adjust the path based on your project structure

const Comment = sequelize.define('Comment', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: "Comment",
        timestamps: false, 
    }
);

module.exports = { Comment };
