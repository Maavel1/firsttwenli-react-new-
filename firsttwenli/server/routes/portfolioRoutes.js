const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router.get("/", portfolioController.getAllProjects);

module.exports = router;
