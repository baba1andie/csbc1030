const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");

class Comment extends Model {}

Comment.init(
  {
    // Comment ID
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Post ID to which the comment belongs
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts", // This is a reference to another model
        key: "id", // This is the column name of the referenced model
      },
    },
    // Name of the commenter
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Email of the commenter
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validates that the field is an email
      },
    },
    // Body of the comment
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true, // Enable timestamps if you want Sequelize to automatically manage createdAt and updatedAt
  }
);

module.exports = Comment;
