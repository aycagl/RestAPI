const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { getFoodRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

// GET /recommendations/food
router.get("/food", authenticate, getFoodRecommendations);

module.exports = router;

