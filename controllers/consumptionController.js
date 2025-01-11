const User = require('../models/User');

const logFoodConsumption = async (req, res) => {
    try {
      const { foodWaste } = req.body;
  
      if (!foodWaste || typeof foodWaste !== 'number' || isNaN(foodWaste)) {
        return res.status(400).json({ message: 'Please provide a valid foodWaste value.' });
      }
  
      const userId = req.user.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.stats.food += foodWaste;
      await user.save();
  
      res.status(200).json({ message: 'Food consumption has been recorded.', stats: user.stats });
    } catch (error) {
      console.error('Error in logFoodConsumption:', error.message);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  const logTrashProduction = async (req, res) => {
    try {
      const { trashAmount } = req.body; 

      if (!trashAmount || typeof trashAmount !== 'number' || isNaN(trashAmount)) {
        return res.status(400).json({ message: 'Please provide a valid trashAmount value.' });
      }

      const userId = req.user.id; // JWT'den gelen kullanıcı ID
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.stats.trash += trashAmount;
      await user.save();
  
      res.status(200).json({ message: 'Food consumption has been recorded.', stats: user.stats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const logWaterConsumption = async (req, res) => {
    try {
      const { waterUsage } = req.body; 

      if (!waterUsage || typeof waterUsage !== 'number' || isNaN(waterUsage)) {
        return res.status(400).json({ message: 'Please provide a valid waterUsage value.' });
      }

      const userId = req.user.id; 
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.stats.water += waterUsage;
      await user.save();
  
      res.status(200).json({ message: 'Water consumption has been recorded.', stats: user.stats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


const logElectricityConsumption = async (req, res) => {
  try {
    const { electricityUsage } = req.body; 

    if (!electricityUsage || typeof electricityUsage !== 'number' || isNaN(electricityUsage)) {
      return res.status(400).json({ message: 'Please provide a valid electricity Usage value.' });
    }
    
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.stats.electricity += electricityUsage;
    await user.save();

    res.status(200).json({ message: 'Electricity consumption has been recorded', stats: user.stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
const logTransportation = async (req, res) => {
  try {
    const { transportationType, distance, fuelType } = req.body; 

    const validTransportationTypes = ["car", "bus", "bike", "walking"];

    if (!transportationType || typeof transportationType !== "string" || !validTransportationTypes.includes(transportationType)) {
      return res.status(400).json({ message: 'Please provide a valid transportation value. (car, bus, bike, walking)' });
    }

    if (!distance || typeof distance !== "number" || isNaN(distance) || distance <= 0) {
      return res.status(400).json({ message: "Please provide a valid distance value. (Must be positive)" });
    }

    if (["car", "bus"].includes(transportationType) && (!fuelType || typeof fuelType !== "string")) {
      return res.status(400).json({ message: "Please provide a valid fuel type value. (mandatory for car and bus)" });
    }

    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.stats.transportation) {
      user.stats.transportation = [];
    }

    user.stats.transportation.push({
      type: transportationType,
      distance,
      fuel: transportationType === "walking" || transportationType === "bike" ? null : fuelType, 
      date: new Date(),
    });

    await user.save();

    res.status(200).json({ message: "Transportation has been recorded.", stats: user.stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

  module.exports = { logFoodConsumption, logTrashProduction, logWaterConsumption, logElectricityConsumption, logTransportation };
  
