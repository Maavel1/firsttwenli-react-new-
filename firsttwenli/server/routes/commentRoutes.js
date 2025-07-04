const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByService,
  getAverageRating,
} = require("../controllers/commentController");

router.post("/", addComment);
router.get("/:service_id", getCommentsByService);
router.get("/:service_id/rating", getAverageRating);

module.exports = router;
