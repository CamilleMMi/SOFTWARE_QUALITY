const express = require('express');
const router = express.Router();
const billetController = require('../controllers/billetController');

router.post('/', billetController.createBillet);
router.get('/', billetController.getAllBillets);
router.get('/:id', billetController.getBilletById);
router.put('/:id', billetController.updateBillet);
router.delete('/:id', billetController.deleteBillet);

module.exports = router;
