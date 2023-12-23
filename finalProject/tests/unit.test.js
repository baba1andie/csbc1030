const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index');
let token;

describe('Authentication Routes', () => {
  describe('POST /users/login', () => {
    it('should be able to login and receive an authentication token', async () => {
      const credentials = { username: 'pooja123', password: 'abc@123' };

      const res = await request(app).post('/users/login').send(credentials);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('should not be able to login with invalid credentials', async () => {
      const invalidCredentials = { username: 'invaliduser', password: 'invalidpassword' };

      const res = await request(app).post('/users/login').send(invalidCredentials);
      expect(res.status).to.equal(401);
    });
  });
});

describe('Authentication and User Endpoints', () => {
  before(async () => {
    const credentials = {
      username: 'pooja123',
      password: 'abc@123'
    };

    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
  });

  describe('POST /posts - Create new post', () => {
    it('should be able to create a new user', async () => {
      const postData = { 
        title: 'Post create ', 
        body: 'Testing of post create api' };

      const res = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send(postData);
      expect(res.status).to.equal(201);
    });

    it('should not be able to create a post without required data', async () => {
      const abc = { title: "Not have required data"};

      const res = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send(abc);
      expect(res.status).to.equal(500);
    });
  
  })

  describe('Get all posts ', () => {
    it('should fetch all posts for authenticated  user', async () => {

      const res = await request(app).get('/posts').set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(201);
    });
  });

});