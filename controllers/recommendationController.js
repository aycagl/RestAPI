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

module.exports = { getFoodRecommendations };

  
