// server/routes/orderRoutes.js

const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

// POST /orders — создать заказ
router.post("/", createOrder);

// GET /orders — получить все заказы
router.get("/", getOrders);

module.exports = router;
