const { getCoordinates, getNearbyPlaces } = require("../helpers/mapsHelper");
const axios = require("axios");

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

const getEcoFriendlyTransport = async (req, res) => {
    try {
      const { origin, destination } = req.query;
  
      if (!origin || !destination) {
        return res.status(400).json({
          message: "Origin and destination are required.",
        });
      }
  
      const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
      // Deafault driving modu Directions API call
      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json`;
      const response = await axios.get(directionsUrl, {
        params: {
          origin,
          destination,
          mode: "driving",
          key: GOOGLE_MAPS_API_KEY,
        },
      });
  
      if (!response.data.routes.length) {
        return res.status(404).json({ message: "No routes found." });
      }
  
      const route = response.data.routes[0];
      const steps = route.legs[0].steps.map((step) => ({
        instruction: step.html_instructions.replace(/<[^>]+>/g, ""), // HTML etiketlerini temizleme
        distance: step.distance.text,
        duration: step.duration.text,
      }));
  
      const ecoFriendlyOptions = [
        {
          mode: "walking",
          description: "Walk whenever possible for zero emissions.",
          link: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}&travelmode=walking`,
        },
        {
          mode: "bicycling",
          description: "Use a bicycle for a greener commute.",
          link: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}&travelmode=bicycling`,
        },
        {
          mode: "transit",
          description: "Take public transportation to reduce your carbon footprint.",
          link: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}&travelmode=transit`,
        },
      ];
  
      res.status(200).json({
        message: "Eco-friendly transportation options and route details",
        origin,
        destination,
        total_distance: route.legs[0].distance.text,
        total_duration: route.legs[0].duration.text,
        steps,
        ecoFriendlyOptions,
      });
    } catch (error) {
      console.error("Error fetching eco-friendly transport options:", error.message);
      res.status(500).json({ message: "Server error. Unable to fetch transport options." });
    }
  };

module.exports = { getNearbyShelters, getEcoFriendlyTransport };
