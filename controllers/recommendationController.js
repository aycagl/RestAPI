const User = require("../models/User");
const { calculateCarbonFootprint } = require("./statsController");

const getFoodRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Total carbon footprint using user object
    const totalCarbonFootprint = await calculateCarbonFootprint(user);

    // Calculate food-specific carbon footprint
    const { food } = user.stats;
    const CO2_FACTORS = { food: 0.5 };
    const foodCarbonFootprint = food * CO2_FACTORS.food;

    // Recommendations for reducing food waste
    const recommendations = [
      "Try composting leftover food.",
      "Use the freezer to store food for a longer time.",
      "Incorporate less consumed foods into your weekly meal plan.",
    ];

    // Static nearby shelters data
    const nearbyShelters = [
      { name: "Hope Shelter", address: "123 Street, Istanbul" },
      { name: "Life Center", address: "456 Avenue, Ankara" },
    ];

    res.status(200).json({
      message: "Recommendations to reduce food waste and nearby shelters",
      foodCarbonFootprint: `${foodCarbonFootprint.toFixed(2)} kg CO2`,
      totalCarbonFootprint: `${totalCarbonFootprint} kg CO2`,
      recommendations,
      nearbyShelters,
    });
  } catch (error) {
    console.error("Error fetching food recommendations:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch recommendations." });
  }
};

const getTrashRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Total carbon footprint using user object
    const totalCarbonFootprint = await calculateCarbonFootprint(user);

    // Calculate food-specific carbon footprint
    const { trash } = user.stats;
    const CO2_FACTORS = { trash: 0.7 };
    const trashCarbonFootprint = trash * CO2_FACTORS.trash;

    const recommendations = [
      "Sort your trash into recyclable categories.",
      "Compost organic waste to reduce landfill contributions.",
      "Use reusable bags, bottles, and containers.",
    ];

    res.status(200).json({
      message: "Recommendations to reduce trash production",
      trashCarbonFootprint: `${trashCarbonFootprint.toFixed(2)} kg CO2`,
      totalCarbonFootprint: `${totalCarbonFootprint} kg CO2`,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching trash recommendations:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch recommendations." });
  }
};


const getWaterRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Total carbon footprint using user object
    const totalCarbonFootprint = await calculateCarbonFootprint(user);

    // Calculate water-specific carbon footprint
    const { water } = user.stats;
    const CO2_FACTORS = { water: 0.003 };
    const waterCarbonFootprint = water * CO2_FACTORS.water;

    // Recommendations for saving water
    const recommendations = [
      "Turn off the tap while brushing your teeth.",
      "Fix leaking faucets immediately.",
      "Install water-saving showerheads and taps.",
    ];

    res.status(200).json({
      message: "Recommendations to save water",
      waterCarbonFootprint: `${waterCarbonFootprint.toFixed(2)} kg CO2`,
      totalCarbonFootprint: `${totalCarbonFootprint} kg CO2`,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching water recommendations:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch recommendations." });
  }
};

const getElectricityRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Total carbon footprint using user object
    const totalCarbonFootprint = await calculateCarbonFootprint(user);

    // Calculate electricity-specific carbon footprint
    const { electricity } = user.stats;
    const CO2_FACTORS = { electricity: 0.85 };
    const electricityCarbonFootprint = electricity * CO2_FACTORS.electricity;

    // Recommendations for saving electricity
    const recommendations = [
      "Unplug devices when not in use.",
      "Switch to energy-efficient LED light bulbs.",
      "Use natural light during the day.",
    ];

    res.status(200).json({
      message: "Recommendations to save electricity",
      electricityCarbonFootprint: `${electricityCarbonFootprint.toFixed(2)} kg CO2`,
      totalCarbonFootprint: `${totalCarbonFootprint} kg CO2`,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching electricity recommendations:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch recommendations." });
  }
};

const getTransportRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Total carbon footprint using user object
    const totalCarbonFootprint = await calculateCarbonFootprint(user);

    // Calculate transportation-specific carbon footprint
    const { transportation } = user.stats;
    const CO2_FACTORS = {
      transportation: {
        gasoline: 2.31,
        diesel: 2.68,
      },
    };

    let transportCarbonFootprint = 0;
    transportation.forEach((entry) => {
      const { type, distance, fuel } = entry;
      if (type === "car" || type === "bus") {
        const fuelEmission = CO2_FACTORS.transportation[fuel.toLowerCase()] || 0;
        transportCarbonFootprint += distance * fuelEmission;
      }
    });

    // Recommendations for eco-friendly transport
    const recommendations = [
      "Consider carpooling to reduce fuel usage.",
      "Switch to public transport whenever possible.",
      "Use bikes or walk for short distances.",
    ];

    res.status(200).json({
      message: "Recommendations for eco-friendly transportation",
      transportCarbonFootprint: `${transportCarbonFootprint.toFixed(2)} kg CO2`,
      totalCarbonFootprint: `${totalCarbonFootprint} kg CO2`,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching transport recommendations:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch recommendations." });
  }
};

module.exports = { getFoodRecommendations, getTrashRecommendations, getWaterRecommendations, getElectricityRecommendations, getTransportRecommendations };

  
