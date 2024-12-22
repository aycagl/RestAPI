const User = require('../models/User');

const calculateCarbonFootprint = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }
  
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
  
      res.status(200).json({
        message: "Karbon ayak izi başarıyla hesaplandı.",
        carbonFootprint: carbonFootprint.toFixed(2),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  };
  
  module.exports = { calculateCarbonFootprint };
  