const express = require("express");
const { getNearbyShelters } = require("../controllers/mapsController");

const router = express.Router();

// GET /shelters
router.get("/shelters", getNearbyShelters);

module.exports = router;
