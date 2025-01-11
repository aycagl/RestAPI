const axios = require("axios");
require("dotenv").config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCoordinates = async (city, district) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
  const response = await axios.get(geocodeUrl, {
    params: {
      address: `${district},${city}`,
      key: GOOGLE_MAPS_API_KEY,
    },
  });

  const location = response.data.results[0]?.geometry.location;
  if (!location) {
    throw new Error("Location not found.");
  }

  return location;
};

const getNearbyPlaces = async (lat, lng, keyword = "shelter", radius = 5000, type = "charity") => {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const response = await axios.get(placesUrl, {
      params: {
        location: `${lat},${lng}`,
        radius,
        keyword,
        type,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
  
    return response.data.results
      .filter((place) => 
        place.name.toLowerCase().includes("barınak") || 
        place.name.toLowerCase().includes("hayvan")
      )
      .map((place) => ({
        name: place.name,
        address: place.vicinity,
        location: place.geometry.location,
      }));
  };
  
  

module.exports = { getCoordinates, getNearbyPlaces };
