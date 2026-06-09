const express = require('express');
const smsController = require('../controllers/smsController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

// Get SMS logs (admin only)
router.get('/logs', verifyToken, verifyRole('ADMIN'), smsController.getSmsLogs);

module.exports = router;
