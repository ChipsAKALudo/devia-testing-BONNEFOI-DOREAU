const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define order routes
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);

module.exports = router;
