const User = require('../models/User');

const getUserSummary = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const carbonFootprint = await calculateCarbonFootprint(user);

    res.status(200).json({
      message: 'User summary retrieved..',
      summary: {
        food: user.stats.food,
        trash: user.stats.trash,
        water: user.stats.water,
        electricity: user.stats.electricity,
        transportation: user.stats.transportation,
        carbonFootprint, 
      },
    });
  } catch (error) {
    console.error('Error in getUserSummary:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const calculateCarbonFootprint = async (user) => {
  try {
    const stats = user.stats || {};
    const { food = 0, trash = 0, water = 0, electricity = 0, transportation = [] } = stats;

    const CO2_FACTORS = {
      food: 0.5,
      trash: 0.7,
      water: 0.003,
      electricity: 0.85,
      transportation: {
        gasoline: 2.31,
        diesel: 2.68,
      },
    };

    let carbonFootprint = 0;

    carbonFootprint += food * CO2_FACTORS.food;
    carbonFootprint += trash * CO2_FACTORS.trash;
    carbonFootprint += water * CO2_FACTORS.water;
    carbonFootprint += electricity * CO2_FACTORS.electricity;

    transportation.forEach((entry) => {
      const { type, distance, fuel } = entry;

      if (type === "car" || type === "bus") {
        const fuelEmission = CO2_FACTORS.transportation[fuel.toLowerCase()] || 0;
        carbonFootprint += distance * fuelEmission;
      }
    });

    return carbonFootprint.toFixed(2);
  } catch (error) {
    console.error("Error calculating carbon footprint:", error.message);
    throw new Error("Failed to calculate carbon footprint.");
  }
};

const calculateUserCarbonFootprint = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const carbonFootprint = await calculateCarbonFootprint(user);

    const unit = req.body.unit || "kg"; 

    let convertedCarbonFootprint;
    let unitLabel;

    switch (unit.toLowerCase()) {
      case "ton":
        convertedCarbonFootprint = carbonFootprint / 1000; 
        unitLabel = "ton";
        break;
      case "mg":
      case "miligram":
        convertedCarbonFootprint = carbonFootprint * 1e6; 
        unitLabel = "mg";
        break;
      case "kg":
      default:
        convertedCarbonFootprint = carbonFootprint; 
        unitLabel = "kg";
        break;
    }

    res.status(200).json({
      message: "Carbon footprint calculated successfully.",
      carbonFootprint: `${convertedCarbonFootprint} ${unitLabel}`,
    });
  } catch (error) {
    console.error("Error calculating user carbon footprint:", error.message);
    res.status(500).json({ message: "Failed to calculate carbon footprint." });
  }
};


module.exports = { getUserSummary, calculateCarbonFootprint, calculateUserCarbonFootprint};
  
  