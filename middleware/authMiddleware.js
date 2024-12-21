// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Erişim engellendi. Token eksik.' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Kullanıcı bilgilerini buraya ekliyoruz
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Geçersiz token.' });
//     }
// };

// module.exports = { authenticate };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme tokenı eksik.' });
    }

    // Token'ı çözümle ve logla
    console.log('Received Token:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    req.user = user; // Doğrulanmış kullanıcıyı request'e ekle
    console.log('Authenticated User:', user);

    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ message: 'Yetkilendirme başarısız.' });
  }
};

module.exports = { authenticate };


