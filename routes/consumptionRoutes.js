const express = require('express');

const { logFoodConsumption, logTrashProduction, logWaterConsumption, logElectricityConsumption, logTransportation } = require('../controllers/consumptionController');

const { authenticate } = require('../middleware/authMiddleware'); // Middleware doğru import edildi mi?

const router = express.Router();

router.post('/food', authenticate, logFoodConsumption); // Fonksiyonlar tanımlı mı?
router.post('/trash', authenticate, logTrashProduction); // Çöp üretimi endpointi
router.post('/water', authenticate, logWaterConsumption); // Su tüketimi endpointi
router.post('/electricity', authenticate, logElectricityConsumption); // Elektrik tüketimi endpointi
router.post('/transportation', authenticate, logTransportation); 
  

module.exports = router;
