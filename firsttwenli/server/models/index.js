const { Sequelize } = require("sequelize");

// Вариант 1: Использование переменных окружения по отдельности (рекомендуется)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? { require: true, rejectUnauthorized: false }
          : false,
    },
  }
);

module.exports = sequelize;
