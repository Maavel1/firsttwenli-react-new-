const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    comment_text: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        len: [20, 400],
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    tableName: "comments",
    timestamps: true,
    paranoid: true, // Мягкое удаление
  }
);

module.exports = Comment;
