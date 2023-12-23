const sequelize = require("../config/dbConfig.js");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Comment",
    timestamps: false,
  },
);

module.exports = { Comment };
