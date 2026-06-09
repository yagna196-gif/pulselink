const express = require('express');
const requestController = require('../controllers/requestController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

// Create blood request
router.post('/', verifyToken, verifyRole('PATIENT', 'ADMIN'), requestController.createRequest);

// Get all requests
router.get('/', verifyToken, requestController.getRequests);

// Get request by ID
router.get('/:id', verifyToken, requestController.getRequestById);

// Update request status
router.put('/:id/status', verifyToken, verifyRole('ADMIN'), requestController.updateRequestStatus);

// Respond to request
router.post('/:id/respond', verifyToken, verifyRole('DONOR'), requestController.respondToRequest);

module.exports = router;
