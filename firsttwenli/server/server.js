const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();




const path = require("path");
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const sequelize = require("./models/index"); // ⚠️ подключаем Sequelize instance
const portfolioRoutes = require("./routes/portfolioRoutes");
require("./models/Comment"); 
require("./models/Portfolio"); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/uploads", express.static("public/uploads"));

sequelize
  .authenticate()
  .then(() => console.log("✅ Подключено к базе:", process.env.DB_NAME))
  .catch((err) => console.error("❌ Ошибка подключения к БД:", err));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
