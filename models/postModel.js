const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");

class Post extends Model {}

Post.init(
  {
    // Post ID
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // User ID associated with the post
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // This is a reference to another model
        key: "id", // This is the column name of the referenced model
      },
    },
    // Title of the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Body of the post
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true, // Enable timestamps if you want Sequelize to automatically manage createdAt and updatedAt
  }
);

module.exports = Post;
