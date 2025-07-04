const pool = require("../config/db");

// Получить все отзывы
const getAllReviews = async () => {
  const result = await pool.query(
    "SELECT * FROM reviews.reviews ORDER BY created_at DESC"
  );
  return result.rows;
};

// Добавить новый отзыв
const addReview = async (name, comment, rating) => {
  const result = await pool.query(
    "INSERT INTO reviews.reviews (name, comment, rating) VALUES ($1, $2, $3) RETURNING *",
    [name, comment, rating]
  );
  return result.rows[0];
};

module.exports = {
  getAllReviews,
  addReview,
};
