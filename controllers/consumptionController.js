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
 

  module.exports = { logFoodConsumption, logTrashProduction, logWaterConsumption, logElectricityConsumption };
  
