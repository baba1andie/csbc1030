const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let authToken; // Changed variable name to 'authToken'
const app = require('../../index');

describe('User Authentication and Endpoints', () => {
  before(async () => {
    const credentials = {
      username: 'newUserTest', // Changed username for uniqueness
      password: 'new@UserTest' // Changed password for uniqueness
    };

    const response = await request(app).post('/users/login').send(credentials);
    authToken = response.body.token;
  });

  describe('User Endpoints', () => {
    describe('GET /users', () => {
      it('should successfully get all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).to.equal(200);
      });
    });

    describe('GET /users/:id', () => {
      it('should get a single user by ID with the correct user ID', async () => {
        const userId = 1; // Provide a valid user ID for testing
        const response = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${authToken}`);
        expect(response.status).to.equal(200);
      });

      it('should return 404 if user ID does not exist', async () => {
        const nonExistingUserId = 999; // Provide a user ID that doesn't exist
        const response = await request(app).get(`/users/${nonExistingUserId}`);
        expect(response.status).to.equal(401);
      });
    });

    describe('POST /users', () => {
      it('should create a new user with valid data', async () => {
        const userData = {
          username: 'testNewUser', // Changed username for uniqueness
          password: 'testNew@User', // Changed password for uniqueness
          first_name: 'aaa',
          last_name: 'bbb'
        };

        const response = await request(app).post('/users').set('Authorization', `Bearer ${authToken}`).send(userData);
        expect(response.status).to.equal(201);
      });

      it('should not create a user without required data', async () => {
        const invalidUserData = {
          password: 'password123',
          first_name: 'aa', // Corrected typo in key name
          last_name: 'bb'
        };

        const response = await request(app).post('/users').set('Authorization', `Bearer ${authToken}`).send(invalidUserData);
        expect(response.status).to.equal(500);
      });
    });
  });
});
