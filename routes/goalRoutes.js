const express = require('express');
const { getGoalsByUserId, setGoals } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Kullanıcı hedeflerini al
router.get('/:userId', authenticate, getGoalsByUserId);

// Kullanıcı hedeflerini belirle
router.post('/', authenticate, setGoals);

module.exports = router;

