const express = require("express");
const reviewsController = require("../controllers/reviewsController");

const router = express.Router();

// Получить все отзывы
router.get("/", reviewsController.getReviews);

// Добавить новый отзыв
router.post("/", reviewsController.createReview);

module.exports = router;
