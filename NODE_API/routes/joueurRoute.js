const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/joueurController');

router.post('/', joueurController.createJoueur);
router.get('/', joueurController.getAllJoueurs);
router.get('/:id', joueurController.getJoueurById);
router.put('/:id', joueurController.updateJoueur);
router.delete('/:id', joueurController.deleteJoueur);

module.exports = router;
