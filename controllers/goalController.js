// goalController.js
const User = require('../models/User');

// Kullanıcı hedeflerini güncelle
const setGoals = async (req, res) => {
  try {
    const { goals } = req.body; // Gönderilen hedefler

    const user = await User.findById(req.user.id);  // JWT'den alınan userId ile kullanıcıyı bul
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    user.goals = goals; // Mevcut hedefleri güncelle
    await user.save();

    res.status(200).json({ message: 'Hedefler güncellendi.', goals: user.goals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// Kullanıcı hedeflerini getir
const getGoals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // JWT'den alınan userId ile kullanıcıyı bul
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({ message: 'Hedefler alındı.', goals: user.goals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

module.exports = { setGoals, getGoals };
