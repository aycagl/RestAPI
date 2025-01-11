const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");  
const { calculateUserCarbonFootprint } = require("../controllers/statsController");
const { getFoodRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

// POST /calculate/carbon-footprint
router.post("/carbon-footprint", authenticate, calculateUserCarbonFootprint);

// GET /recommendations/food
router.get("/food", authenticate, getFoodRecommendations);

module.exports = router;
