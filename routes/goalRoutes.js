const express = require('express');
const { setGoals } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, setGoals);

module.exports = router;
