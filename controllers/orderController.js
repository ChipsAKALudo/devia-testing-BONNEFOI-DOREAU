const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const { product, quantity, price } = req.body;
        if (!product || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newOrder = await Order.create({ product, quantity, price });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};