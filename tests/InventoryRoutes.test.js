const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db.js');

const { expect } = chai;
const request = supertest(app);

describe('Inventory Routes', () => {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    let inventoryId;

    // Test pour créer un stock
    it('should create a new inventory record', async () => {
        const res = await request.post('/inventory').send({
            product_id: 1,
            warehouse_location: 'Zone A',
            quantity: 50,
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.product_id).to.equal(1);
        expect(res.body.warehouse_location).to.equal('Zone A');
        expect(res.body.quantity).to.equal(50);
        expect(res.body).to.have.property('last_updated');

        inventoryId = res.body.id;
    });

    // Test pour récupérer tous les stocks
    it('should retrieve all inventory records', async () => {
        const res = await request.get('/inventory');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    // Test pour récupérer un stock par ID
    it('should retrieve an inventory record by ID', async () => {
        const res = await request.get(`/inventory/${inventoryId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', inventoryId);
        expect(res.body.product_id).to.equal(1);
        expect(res.body.warehouse_location).to.equal('Zone A');
    });

    // Test pour mettre à jour un stock
    it('should update an inventory record', async () => {
        const res = await request.put(`/inventory/${inventoryId}`).send({
            product_id: 1,
            warehouse_location: 'Zone B',
            quantity: 75,
        });

        expect(res.status).to.equal(200);
        expect(res.body.warehouse_location).to.equal('Zone B');
        expect(res.body.quantity).to.equal(75);
        expect(res.body).to.have.property('last_updated');
    });

    // Test pour supprimer un stock
    it('should delete an inventory record', async () => {
        const res = await request.delete(`/inventory/${inventoryId}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Stock supprimé avec succès');

        // Vérifier que le stock n'existe plus
        const findRes = await request.get(`/inventory/${inventoryId}`);
        expect(findRes.status).to.equal(404);
    });
});