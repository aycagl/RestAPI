const User = require('../models/User');

const logFoodConsumption = async (req, res) => {
    try {
      const { foodWaste } = req.body;
  
      // Gelen değerin doğruluğunu kontrol edin
      if (!foodWaste || typeof foodWaste !== 'number' || isNaN(foodWaste)) {
        return res.status(400).json({ message: 'Geçerli bir foodWaste değeri gönderin.' });
      }
  
      const userId = req.user.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      // Gıda atığı puanını artır
      user.stats.food += foodWaste;
      await user.save();
  
      res.status(200).json({ message: 'Gıda tüketimi kaydedildi.', stats: user.stats });
    } catch (error) {
      console.error('Error in logFoodConsumption:', error.message);
      res.status(500).json({ message: 'Sunucu hatası.' });
    }
  };

  const logTrashProduction = async (req, res) => {
    try {
      const { trashAmount } = req.body; // Günlük çöp üretim miktarı

      // Gelen değerin doğruluğunu kontrol edin
      if (!trashAmount || typeof trashAmount !== 'number' || isNaN(trashAmount)) {
        return res.status(400).json({ message: 'Geçerli bir trashAmount değeri gönderin.' });
      }

      const userId = req.user.id; // JWT'den gelen kullanıcı ID
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      // Kullanıcının çöp üretim istatistiğini artır
      user.stats.trash += trashAmount;
      await user.save();
  
      res.status(200).json({ message: 'Çöp üretimi kaydedildi.', stats: user.stats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Sunucu hatası.' });
    }
  };
  
  const logWaterConsumption = async (req, res) => {
    try {
      const { waterUsage } = req.body; // Su tüketimi verisi

      // Gelen değerin doğruluğunu kontrol edin
      if (!waterUsage || typeof waterUsage !== 'number' || isNaN(waterUsage)) {
        return res.status(400).json({ message: 'Geçerli bir waterUsage değeri gönderin.' });
      }

      const userId = req.user.id; // JWT'den gelen kullanıcı ID
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      // Kullanıcının su tüketim istatistiğini artır
      user.stats.water += waterUsage;
      await user.save();
  
      res.status(200).json({ message: 'Su tüketimi kaydedildi.', stats: user.stats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Sunucu hatası.' });
    }
  };


const logElectricityConsumption = async (req, res) => {
  try {
    const { electricityUsage } = req.body; // Elektrik tüketimi verisi

    // Gelen değerin doğruluğunu kontrol edin
    if (!electricityUsage || typeof electricityUsage !== 'number' || isNaN(electricityUsage)) {
      return res.status(400).json({ message: 'Geçerli bir electricityUsage değeri gönderin.' });
    }
    
    const userId = req.user.id; // JWT'den gelen kullanıcı ID

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Elektrik tüketim puanını artır
    user.stats.electricity += electricityUsage;
    await user.save();

    res.status(200).json({ message: 'Elektrik tüketimi kaydedildi.', stats: user.stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
 
const logTransportation = async (req, res) => {
  try {
      const { transportationType, distance, fuelType } = req.body; // Gerekli veriler

      // Gelen değerlerin doğruluğunu kontrol edin
      if (!transportationType || typeof transportationType !== 'string') {
          return res.status(400).json({ message: 'Geçerli bir transportationType değeri gönderin.' });
      }
      if (!distance || typeof distance !== 'number' || isNaN(distance)) {
          return res.status(400).json({ message: 'Geçerli bir distance değeri gönderin.' });
      }
      if (!fuelType || typeof fuelType !== 'string') {
          return res.status(400).json({ message: 'Geçerli bir fuelType değeri gönderin.' });
      }

      const userId = req.user.id; // JWT'den gelen kullanıcı ID

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }

      // Taşıma istatistiklerini güncelle
      if (!user.stats.transportation) {
          user.stats.transportation = [];
      }

      user.stats.transportation.push({
          type: transportationType,
          distance,
          fuel: fuelType,
          date: new Date()
      });

      await user.save();

      res.status(200).json({ message: 'Taşıma verileri kaydedildi.', stats: user.stats });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


  module.exports = { logFoodConsumption, logTrashProduction, logWaterConsumption, logElectricityConsumption, logTransportation };
  
