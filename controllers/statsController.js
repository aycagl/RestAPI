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
  
  module.exports = { calculateCarbonFootprint };
  
  