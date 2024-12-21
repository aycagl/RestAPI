const express = require('express');
const { setGoals, getGoals } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:userId', authenticate, setGoals); // Hedefleri ayarla
router.get('/:userId', authenticate, getGoals); // Hedefleri getir

module.exports = router;
