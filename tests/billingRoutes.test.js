const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const User = require('../models/userModel');

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Billing Routes', () => {
  let testUserId;

  // Before running tests, set up the database and create a test user
  before(async () => {
    await sequelize.sync({ force: true }); // Reset database
    
    // Create a test user to associate with billings
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
    });
    
    testUserId = testUser.id;
  });

  describe('POST /billings', () => {
    it('should create a new billing with due date two weeks from now', async () => {
      const today = new Date();
      
      const response = await request.post('/billings').send({
        User: testUserId,
        paid: false
      });
      
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('User', testUserId);
      expect(response.body).to.have.property('paid', false);
      
      let dueDate = new Date(response.body.dueDate);
      let twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(today.getDate() + 14);
      
      //check that the dates are identical if we ignore the time
      dueDateNoTime = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      twoWeeksFromNowNoTime = new Date(twoWeeksFromNow.getFullYear(), twoWeeksFromNow.getMonth(), twoWeeksFromNow.getDate());

      expect(dueDateNoTime.toString()).to.equal(twoWeeksFromNowNoTime.toString());
      expect(response.body).to.have.property('dueDate');
    });
    
    it('should accept a custom due date if provided', async () => {
      const customDate = new Date();
      customDate.setDate(customDate.getDate() + 30);
      
      const response = await request.post('/billings').send({
        User: testUserId,
        dueDate: customDate,
        paid: false
      });
      
      expect(response.status).to.equal(201);
      
        let dueDate = new Date(response.body.dueDate);
        let customDateNoTime = new Date(customDate.getFullYear(), customDate.getMonth(), customDate.getDate());
        dueDateNoTime = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        expect(dueDateNoTime.toString()).to.equal(customDateNoTime.toString());
    });
    
    it('should return error if User ID is missing', async () => {
      const response = await request.post('/billings').send({
        paid: false
      });
      
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });
  
  describe('GET /billings', () => {
    it('should retrieve all billings', async () => {
      const response = await request.get('/billings');
      
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.least(2); // assuming the previous tests passed
      
      const billing = response.body[0];
      expect(billing).to.have.property('id');
      expect(billing).to.have.property('User');
      expect(billing).to.have.property('dueDate');
      expect(billing).to.have.property('paid');
    });
  });
  
  describe('GET /billings/:id', () => {
    let billingId;
    
    before(async () => {
      // Create a billing to retrieve
      const response = await request.post('/billings').send({
        User: testUserId,
        paid: false
      });
      
      billingId = response.body.id;
    });
    
    it('should retrieve a billing by ID', async () => {
      const response = await request.get(`/billings/${billingId}`);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', billingId);
      expect(response.body).to.have.property('User', testUserId);
      expect(response.body).to.have.property('paid', false);
    });
    
    it('should return 404 if billing not found', async () => {
      const response = await request.get('/billings/99999');
      
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error', 'Billing not found');
    });
  });
  
  describe('PUT /billings/:id', () => {
    let billingId;
    
    before(async () => {
      // Create a billing to update
      const response = await request.post('/billings').send({
        User: testUserId,
        paid: false
      });
      
      billingId = response.body.id;
    });
    
    it('should update a billing', async () => {
      const newDueDate = new Date();
      newDueDate.setDate(newDueDate.getDate() + 60); // 60 days from now
      
      const response = await request.put(`/billings/${billingId}`).send({
        dueDate: newDueDate,
        paid: true
      });
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', billingId);
      expect(response.body).to.have.property('paid', true);
      
      // Verify the due date was updated
      const responseDueDate = new Date(response.body.dueDate);
      const diffTime = Math.abs(responseDueDate - newDueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      expect(diffDays).to.be.lessThan(1);
    });
    
    it('should return 404 if billing not found', async () => {
      const response = await request.put('/billings/99999').send({
        paid: true
      });
      
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error', 'Billing not found');
    });
  });
  
  describe('DELETE /billings/:id', () => {
    let billingId;
    
    before(async () => {
      const response = await request.post('/billings').send({
        User: testUserId,
        paid: false
      });
      
      billingId = response.body.id;
    });
    
    it('should delete a billing', async () => {
      const response = await request.delete(`/billings/${billingId}`);
      
      expect(response.status).to.equal(204);
      
      const getResponse = await request.get(`/billings/${billingId}`);
      expect(getResponse.status).to.equal(404);
    });
    
    it('should return 404 if billing not found', async () => {
      const response = await request.delete('/billings/99999');
      
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error', 'Billing not found');
    });
  });
  
  // Test 6: Association with orders
  /*describe('GET /billings/:id/orders', () => {
    let billingId;
    
    before(async () => {
      // Create a billing for association
      const billingResponse = await request.post('/billings').send({
        User: testUserId,
        paid: false
      });
      
      billingId = billingResponse.body.id;
      
      // Create a few orders associated with this billing
      await request.post('/orders').send({
        Billing: billingId,
        product: 'Product for Billing Test',
        quantity: 1,
        price: 100
      });
      
      await request.post('/orders').send({
        Billing: billingId,
        product: 'Another Product',
        quantity: 2,
        price: 75
      });
    });
    
    it('should retrieve all orders associated with a billing', async () => {
      const response = await request.get(`/billings/${billingId}/orders`);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(2);
      
      const order = response.body[0];
      expect(order).to.have.property('Billing', billingId);
      expect(order).to.have.property('product');
      expect(order).to.have.property('quantity');
      expect(order).to.have.property('price');
    });
    
    it('should return 404 if billing not found', async () => {
      const response = await request.get('/billings/99999/orders');
      
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error', 'Billing not found');
    });
  }); //todo
  */
});
