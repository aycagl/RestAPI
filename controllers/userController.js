const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // .env dosyasını içe aktar

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password'); // Şifreyi hariç tut

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({
      message: 'Kullanıcı profili alındı.',
      profile: {
        name: user.name,
        email: user.email,
        stats: user.stats, // Kullanıcıya ait tüketim verileri
        goals: user.goals || null, // Hedefler (varsa)
      },
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


// Kullanıcı kaydı
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Zorunlu alanların kontrolü
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Kullanıcı zaten var mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Yeni kullanıcı oluştur
    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Kullanıcı Girişi (Login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Eksik alan kontrolü
        if (!email || !password) {
            return res.status(400).json({ message: 'Lütfen email ve şifreyi girin.' });
        }

        // Kullanıcıyı veritabanında ara
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
        }

        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Şifre hatalı.' });
        }

         // JWT oluştur - .env dosyasındaki JWT_SECRET anahtarını kullan
         const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,  // Burada .env dosyasındaki anahtar kullanılır
            { expiresIn: '7d' }     // Token'ın geçerlilik süresi 7 gün
        );

        // Başarılı yanıt
        res.status(200).json({
            message: 'Giriş başarılı.',
            token, // JWT token'ı
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
    }
};

const setGoals = async (req, res) => {
  try {
      const { userId } = req.params;
      const { goals } = req.body;

      if (!goals) {
          return res.status(400).json({ message: 'Goals are required.' });
      }

      // Veritabanında kullanıcıyı güncelle
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      user.goals = goals; // Goals bilgisini kullanıcıya ekleyin
      await user.save();

      res.status(200).json({
          message: 'Goals successfully set.',
          goals: user.goals
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  //setGoals,
};


