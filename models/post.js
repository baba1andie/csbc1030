const sequelize = require("../config/dbConfig.js");
const { DataTypes } = require("sequelize");

const { Comment } = require("./comment.js");

const Post = sequelize.define(
  "Post",
  {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Post",
    timestamps: false,
  },
);

Post.hasMany(Comment, { foreignKey: "post_id" });

module.exports = { Post };
