const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
