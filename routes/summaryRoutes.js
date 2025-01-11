const express = require('express');
const { getUserSummary } = require('../controllers/statsController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getUserSummary);

module.exports = router;
