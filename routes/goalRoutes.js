const express = require('express');
const { getGoalsByUserId, setGoals } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', authenticate, getGoalsByUserId);
router.post('/', authenticate, setGoals);

module.exports = router;

