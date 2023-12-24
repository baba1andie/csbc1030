
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig');
const { Comment } = require('./commentModel.js');

const Post = sequelize.define('Post', {
    // Define your Post model fields here

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
    {
        tableName: "Post",
        timestamps: false,
    }
);
Post.hasMany(Comment, { foreignKey: "postId" });

module.exports = { Post };
