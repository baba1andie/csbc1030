const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../../index');
const User = require('../../model/userModel');
let authToken;

describe('Authentication and User Endpoints', () => {
  before(async () => {
    const loginCredentials = {
      username: 'abcTest',
      password: 'abc@123'
    };

    const loginResponse = await request(app).post('/users/login').send(loginCredentials);
    authToken = loginResponse.body.token;
  });

  describe('User Routes', () => {
    let testUser;

    before(async () => {
      testUser = await User.create({
        username: 'abcTests',
        password: 'abc@123',
        first_name: 'xyz',
        last_name: 'test'
      });
    });

    after(async () => {
      await User.destroy({ where: { id: testUser.id } });
    });

    describe('GET /users/:id', () => {
      it('should retrieve my user entity with the correct user ID', async () => {
        const userId = testUser.id;
        const response = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${authToken}`);
        expect(response.status).to.equal(200);
      });

      it('should not retrieve a different user entity and return 403', async () => {
        const nonExistingUserId = 100; // Change to a non-existing user ID
        const response = await request(app).get(`/users/${nonExistingUserId}`).set('Authorization', `Bearer ${authToken}`);
        expect(response.status).to.equal(403);
      });

      it('should not retrieve an entity if not authenticated and return 401', async () => {
        const response = await request(app).get(`/users/${testUser.id}`);
        expect(response.status).to.equal(401);
      });
    });

    describe('POST /users', () => {
      it('should create a new user with valid data', async () => {
        const userData = {
          username: 'xyzTest',
          password: 'xyz@123',
          first_name: 'xyz',
          last_name: 'test'
        };

        const response = await request(app).post('/users').set('Authorization', `Bearer ${authToken}`).send(userData);
        expect(response.status).to.equal(201);
      });

      it('should not create a user without required data and return 500', async () => {
        const invalidUserData = {
          password: 'password123',
          first_name: 'aa', // Corrected typo in key name
          last_name: 'bb'
        };

        const response = await request(app).post('/users').set('Authorization', `Bearer ${authToken}`).send(invalidUserData);
        expect(response.status).to.equal(500);
      });
    });

    describe('POST /users/login', function () {
      this.timeout(9000);
      it('should be able to login and receive an authentication token', async () => {
        const loginCredentials = { username: 'abcTest', password: 'abc@123' };

        const response = await request(app).post('/users/login').send(loginCredentials);
        expect(response.status).to.equal(200);
      });

      it('should not be able to login with invalid credentials', async () => {
        const invalidLoginCredentials = { username: 'abcTest', password: 'abc@12' };

        const response = await request(app).post('/users/login').send(invalidLoginCredentials);
        expect(response.status).to.equal(401);
      });
    });
  });
});

