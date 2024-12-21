const express = require('express');
const { logFoodConsumption } = require('../controllers/consumptionController'); // Kontrolör doğru import edildi mi?
const { authenticate } = require('../middleware/authMiddleware'); // Middleware doğru import edildi mi?

const router = express.Router();

router.post('/food', authenticate, logFoodConsumption); // Fonksiyonlar tanımlı mı?

module.exports = router;
