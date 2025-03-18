const Billing = require('../models/billingModel');

exports.createBilling = async (req, res) => {
    try {
        //unwrap to object
        const billingData = { ...req.body };
        
        if (!billingData.dueDate) {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14); // two weeks from now
            billingData.dueDate = dueDate;
        }
        
        if (billingData.paid === undefined) {
            billingData.paid = false;
        }

        if (!billingData.User) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const newBilling = await Billing.create(billingData);
        
        res.status(201).json(newBilling);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.findAll();
        res.json(billings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findByPk(req.params.id);
        if (!billing) {
            return res.status(404).json({ error: 'Billing not found' });
        }
        res.json(billing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBilling = async (req, res) => {
    try {
        const billing = await Billing.findByPk(req.params.id);
        if (!billing) {
            return res.status(404).json({ error: 'Billing not found' });
        }
        
        await billing.update(req.body);
        res.json(billing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBilling = async (req, res) => {
    try {
        const billing = await Billing.findByPk(req.params.id);
        if (!billing) {
            return res.status(404).json({ error: 'Billing not found' });
        }

        await billing.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};