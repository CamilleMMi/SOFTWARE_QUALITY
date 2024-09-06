const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenementController');

router.post('/', evenementController.createEvenement);
router.get('/', evenementController.getAllEvenements);
router.get('/:id', evenementController.getEvenementById);
router.put('/:id', evenementController.updateEvenement);
router.delete('/:id', evenementController.deleteEvenement);

module.exports = router;
