const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");  // Doğru yoldan middleware'i dahil et
const { calculateCarbonFootprint } = require("../controllers/statsController");
const { getFoodRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

// POST /calculate/carbon-footprint
router.post("/carbon-footprint", authenticate, calculateCarbonFootprint);  // JWT doğrulama ekleniyor

// GET /recommendations/food
router.get("/food", authenticate, getFoodRecommendations);

module.exports = router;
