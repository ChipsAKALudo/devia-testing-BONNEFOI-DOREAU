const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Define billing routes
router.get('/', billingController.getAllBillings);
router.post('/', billingController.createBilling);
router.get('/:id', billingController.getBillingById);
router.put('/:id', billingController.updateBilling);
router.delete('/:id', billingController.deleteBilling);

module.exports = router;
