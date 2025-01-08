//kullanıcı hedeflerini alma ve veritabanına kaydetme

const Goal = require('../models/Goal');

const setGoals = async (req, res) => {
  try {
    const userId = req.user.id; // JWT'den gelen kullanıcı ID
    const { type, goalData } = req.body; // hedef tipi (günlük/haftalık) ve hedef verisi

    // Hedef verisi doğrulaması
    if (!goalData || !goalData.food || !goalData.water || !goalData.electricity || !goalData.transportation || !goalData.carbonFootprint) {
      return res.status(400).json({ message: 'Geçerli hedef verisi girin.' });
    }

    // Yeni hedef oluşturuluyor
    const newGoal = new Goal({
      userId,
      type,
      goalData,
    });

    await newGoal.save();

    res.status(201).json({
      message: 'Hedef başarıyla oluşturuldu.',
      goal: newGoal,
    });
  } catch (error) {
    console.error('Error in setGoals:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

module.exports = { setGoals };
