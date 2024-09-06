const express = require('express');
const router = express.Router();
const equipeController = require('../controllers/equipeController');

router.post('/', equipeController.createEquipe);
router.get('/', equipeController.getAllEquipes);
router.get('/:id', equipeController.getEquipeById);
router.put('/:id', equipeController.updateEquipe);
router.delete('/:id', equipeController.deleteEquipe);

module.exports = router;
