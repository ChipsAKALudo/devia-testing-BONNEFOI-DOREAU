const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db.js');

const { expect } = chai;
const request = supertest(app);

describe('Product Routes', () => {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    let productId;

    // Test pour créer un produit
    it('should create a new product', async () => {
        const res = await request.post('/products').send({
            name: 'Product 1',
            price: 10.99,
            quantity: 100,
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Product 1');
        expect(res.body.price).to.equal(10.99);
        expect(res.body.quantity).to.equal(100);

        productId = res.body.id;
    });

    // Test pour récupérer tous les produits
    it('should retrieve all products', async () => {
        const res = await request.get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    // Test pour récupérer un produit par ID
    it('should retrieve a product by ID', async () => {
        const res = await request.get(`/products/${productId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', productId);
        expect(res.body.name).to.equal('Product 1');
    });

    // Test pour mettre à jour un produit
    it('should update a product', async () => {
        const res = await request.put(`/products/${productId}`).send({
            name: 'Product 1 Updated',
            price: 12.99,
            quantity: 150,
        });

        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Product 1 Updated');
        expect(res.body.price).to.equal(12.99);
        expect(res.body.quantity).to.equal(150);
    });

    // Test pour supprimer un produit
    it('should delete a product', async () => {
        const res = await request.delete(`/products/${productId}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Produit supprimé avec succès');

        // Vérifier que le produit n'existe plus
        const findRes = await request.get(`/products/${productId}`);
        expect(findRes.status).to.equal(404);
    });
});
