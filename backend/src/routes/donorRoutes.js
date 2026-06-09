const express = require('express');
const donorController = require('../controllers/donorController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

// Public - donor registration
router.post('/', donorController.createDonor);

// Protected - donor operations
router.get('/', verifyToken, verifyRole('ADMIN'), donorController.getDonors);
router.get('/:id', verifyToken, donorController.getDonorById);
router.put('/:id', verifyToken, donorController.updateDonor);
router.delete('/:id', verifyToken, verifyRole('ADMIN'), donorController.deleteDonor);

module.exports = router;
