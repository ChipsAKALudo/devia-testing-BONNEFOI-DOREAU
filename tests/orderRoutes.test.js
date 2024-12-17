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
        const response = await request.post('/orders').send({
            product: 'ProduitA',
            quantity: 1,
            price: 50
        });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.product).to.equal('ProduitA');
        expect(response.body.quantity).to.equal(1);
        expect(response.body.price).to.equal(50);
    });

    //avec des champs manquants
    it('should return an error if fields are missing', async () => {
        const response = await request.post('/orders').send({
            product: 'ProduitB',
            quantity: 2
        });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'All fields are required');
    });

    // User Story 2: Récupérer toutes les commandes
    it('should retrieve all orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        const order = response.body[0];
        expect(order).to.have.property('id');
        expect(order).to.have.property('product');
        expect(order).to.have.property('quantity');
        expect(order).to.have.property('price');

    });

/*     // User Story 3: Récupérer une commande par ID
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
    }); */
});
