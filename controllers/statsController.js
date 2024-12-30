const User = require('../models/User');

const getUserSummary = async (req, res) => {
  try {
    const userId = req.user.id; // JWT'den gelen kullanıcı ID

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcının karbon ayak izi hesaplanır
    const carbonFootprint = await calculateCarbonFootprint(user);

    // Özet döndürülür
    res.status(200).json({
      message: 'Kullanıcı özeti alındı.',
      summary: {
        food: user.stats.food,
        trash: user.stats.trash,
        water: user.stats.water,
        electricity: user.stats.electricity,
        transportation: user.stats.transportation,
        carbonFootprint, // Hesaplanan karbon ayak izi
      },
    });
  } catch (error) {
    console.error('Error in getUserSummary:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

const calculateCarbonFootprint = async (user) => {
    try {
      const { food, trash, water, electricity, transportation } = user.stats;
  
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
  
  module.exports = { calculateCarbonFootprint, getUserSummary };
  
  