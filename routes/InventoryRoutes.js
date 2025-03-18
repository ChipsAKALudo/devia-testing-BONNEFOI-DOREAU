const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');

// Routes
router.get('/', inventoryController.getAllInventory);       // GET tous les stocks
router.get('/:id', inventoryController.getInventoryById);   // GET un stock par ID
router.post('/', inventoryController.createInventory);      // POST créer un stock
router.put('/:id', inventoryController.updateInventory);    // PUT mettre à jour un stock
router.delete('/:id', inventoryController.deleteInventory); // DELETE supprimer un stock

module.exports = router;