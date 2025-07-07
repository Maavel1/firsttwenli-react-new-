const Portfolio = require("../models/Portfolio");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Portfolio.findAll({ order: [["id", "DESC"]] });
    res.json(projects);
  } catch (error) {
    console.error("Ошибка получения портфолио:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
