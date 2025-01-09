const express = require("express");
const { getNearbyShelters, getEcoFriendlyTransport } = require("../controllers/mapsController");

const router = express.Router();

// GET /shelters
router.get("/shelters", getNearbyShelters);
router.get("/transport", getEcoFriendlyTransport);

module.exports = router;
