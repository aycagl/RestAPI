// userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { getUserSummary } = require('../controllers/statsController');
const { authenticate } = require('../middleware/authMiddleware');
//const { setGoals, getGoals } = require('../controllers/goalController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId/profile', authenticate, getUserProfile);

router.get('/summary', authenticate, getUserSummary);

// Hedefleri ayarlamak ve almak için kullanıcı id'si yerine JWT'deki user id'yi kullan
//router.post('/goals', authenticate, setGoals);  // Burada userId parametresine gerek yok, JWT üzerinden alacağız
//router.get('/goals', authenticate, getGoals);  // Aynı şekilde

module.exports = router;

