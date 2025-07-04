const pool = require("../config/db");
const { Comment } = require("../models");

exports.addComment = async (req, res) => {
  const { service_id, user_name, comment_text, rating } = req.body;

  // Валидация данных
  if (!service_id || !user_name || !comment_text || rating === undefined) {
    return res.status(400).json({
      error: "Все поля обязательны для заполнения",
    });
  }

  if (comment_text.length < 20) {
    return res.status(400).json({
      error: "Комментарий должен содержать минимум 20 символов",
    });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      error: "Рейтинг должен быть числом от 1 до 5",
    });
  }

  if (comment_text.length > 400) {
    return res.status(400).json({
      error: "Комментарий не должен привышать 400 символов",
    });
  }

  if (user_name.length > 50) {
    return res.status(400).json({
      error: "Имя не должно превышать 50 символов",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO comments (service_id, user_name, comment_text, rating ) VALUES ($1, $2, $3, $4) RETURNING *",
      [service_id, user_name, comment_text, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    res.status(500).json({ error: "Ошибка при добавлении комментария" });
  }
};

exports.getCommentsByService = async (req, res) => {
  const { service_id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Сначала получаем общее количество комментариев
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM comments WHERE service_id = $1",
      [service_id]
    );
    const total = parseInt(countResult.rows[0].count);

    // Затем получаем сами комментарии
    const result = await pool.query(
      `SELECT 
        id,
        user_name,
        comment_text,
        rating,
        TO_CHAR(created_at, 'DD.MM.YYYY') as formatted_date
      FROM comments 
      WHERE service_id = $1 
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`,
      [service_id, limit, offset]
    );

    res.status(200).json({
      comments: result.rows,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Полная ошибка при получении комментариев:", error);
    res.status(500).json({
      error: "Ошибка при получении комментариев",
      details: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  const { service_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
         ROUND(AVG(rating)::numeric, 1) AS average_rating,
         COUNT(*) AS total_comments
       FROM comments
       WHERE service_id = $1`,
      [service_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при получении среднего рейтинга:", error);
    res.status(500).json({
      error: "Ошибка при получении среднего рейтинга",
      details: error.message,
    });
  }
};
