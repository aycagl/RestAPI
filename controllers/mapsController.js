const { getCoordinates, getNearbyPlaces } = require("../helpers/mapsHelper");

// GET /map/shelters - Yakındaki barınakları döndürür
const getNearbyShelters = async (req, res) => {
  try {
    const { city, district } = req.query;

    if (!city || !district) {
      return res.status(400).json({ message: "City and district are required." });
    }

    const { lat, lng } = await getCoordinates(city, district);
    const shelters = await getNearbyPlaces(lat, lng);

    res.status(200).json({
      message: "Nearby shelters retrieved successfully.",
      location: { lat, lng },
      shelters,
    });
  } catch (error) {
    console.error("Error fetching shelters:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch shelters." });
  }
};

module.exports = { getNearbyShelters };
