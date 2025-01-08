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

const getGoalsByUserId = async (req, res) => {
  try {
    console.log('Request Params:', req.params); // Gelen parametreleri kontrol edin
    const { userId } = req.params;

    const goals = await Goal.find({ userId });

    if (!goals || goals.length === 0) {
      return res.status(404).json({ message: 'Bu kullanıcı için hedef bulunamadı.' });
    }

    res.status(200).json({
      message: 'Kullanıcı hedefleri başarıyla alındı.',
      goals,
    });
  } catch (error) {
    console.error('Error in getGoalsByUserId:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


module.exports = { setGoals, getGoalsByUserId };
