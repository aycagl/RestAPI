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

  module.exports = { logFoodConsumption };
  
