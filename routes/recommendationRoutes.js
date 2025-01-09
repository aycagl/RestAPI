const express = require("express");
const { getFoodRecommendations, getTrashRecommendations, getWaterRecommendations, getElectricityRecommendations, getTransportRecommendations } = require("../controllers/recommendationController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/food", authenticate, getFoodRecommendations);
router.get("/trash", authenticate, getTrashRecommendations);
router.get("/water", authenticate, getWaterRecommendations);
router.get("/electricity", authenticate, getElectricityRecommendations);
router.get("/transport", authenticate, getTransportRecommendations);

module.exports = router;

