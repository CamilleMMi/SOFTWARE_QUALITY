const express = require('express');
const router = express.Router();
const tournoiController = require('../controllers/tournoiController');

router.post('/', tournoiController.createTournoi);
router.get('/', tournoiController.getAllTournois);
router.get('/:id', tournoiController.getTournoiById);
router.put('/:id', tournoiController.updateTournoi);
router.delete('/:id', tournoiController.deleteTournoi);

module.exports = router;
