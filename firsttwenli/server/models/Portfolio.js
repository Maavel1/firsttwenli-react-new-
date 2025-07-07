const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Portfolio = sequelize.define(
  "Portfolio", // ← Это имя модели в Sequelize, не влияет на SQL, но влияет на alias
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    details: { type: DataTypes.TEXT },
  },
  {
    tableName: "portfolio", // ← имя таблицы в базе БЕЗ кавычек и без заглавных
    timestamps: false,
    schema: "public",
  }
);

module.exports = Portfolio;
