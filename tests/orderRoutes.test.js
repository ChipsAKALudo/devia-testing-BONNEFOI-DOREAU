const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Order Routes', () => {
    // Avant les tests, synchroniser la base de données
    before(async () => {
        await sequelize.sync({ force: true }); // Réinitialise la base de données
    });

    // User Story 1: Créer une commande (user nécéssaire ?) 
    it('should create a new order', async () => {
        const res = await request.post('/orders').send({
            //...
        });
    });

    // User Story 2: Récupérer toutes les commandes
    it('should retrieve all orders', async () => {
        const res = await request.get('/orders');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // User Story 3: Récupérer une commande par ID
    it('should retrieve an order by ID', async () => {
        const newOrder = await request.post('/orders').send({
            //...
        });
    });

    // User Story 4: Mettre à jour une commande
    it('should update an order', async () => {
        const newOrder = await request.post('/orders').send({
            //..
        });

        const res = await request.put(`/orders/${newOrder.body.id}`).send({
            //...
        });
    });

    // User Story 5: Supprimer une commande
    it('should delete an order', async () => {
        const newOrder = await request.post('/orders').send({
            //...
        });

        const res = await request.delete(`/orders/${newOrder.body.id}`);
        expect(res.status).to.equal(204);

        const findRes = await request.get(`/orders/${newOrder.body.id}`);
        expect(findRes.status).to.equal(404);
    });
});
