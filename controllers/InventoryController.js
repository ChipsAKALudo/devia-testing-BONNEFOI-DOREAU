const Inventory = require('../models/InventoryModel');

// Récupérer tous les stocks
exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findAll();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un stock par ID
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Stock non trouvé' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un stock
exports.createInventory = async (req, res) => {
    try {
        const { product_id, warehouse_location, quantity } = req.body;
        if (!product_id || !warehouse_location || quantity === undefined) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }
        const newInventory = await Inventory.create({
            product_id,
            warehouse_location,
            quantity,
            last_updated: new Date()
        });
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un stock
exports.updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Stock non trouvé' });
        }

        const { product_id, warehouse_location, quantity } = req.body;

        await inventory.update({
            product_id,
            warehouse_location,
            quantity,
            last_updated: new Date()
        });

        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un stock
exports.deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Stock non trouvé' });
        }
        await inventory.destroy();
        res.json({ message: 'Stock supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};