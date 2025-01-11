const express = require('express');

const { logFoodConsumption, logTrashProduction, logWaterConsumption, logElectricityConsumption, logTransportation } = require('../controllers/consumptionController');

const { authenticate } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/food', authenticate, logFoodConsumption); 
router.post('/trash', authenticate, logTrashProduction); 
router.post('/water', authenticate, logWaterConsumption); 
router.post('/electricity', authenticate, logElectricityConsumption); 
router.post('/transportation', authenticate, logTransportation); 
  

module.exports = router;
