const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Ruta para actualizar vehículo
router.put('/:id', vehicleController.updateVehicle);

module.exports = router;
