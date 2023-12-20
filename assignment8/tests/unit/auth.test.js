const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../../index');

describe('Authentication Routes', () => {
  describe('POST /users/login', () => {
    it('should successfully log in and return an authentication token', async () => {
      const validCredentials = { username: 'newUserTest', password: 'new@UserTest' };

      const response = await request(app).post('/users/login').send(validCredentials);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });

    it('should fail to log in with invalid credentials and return 401', async () => {
      const invalidCredentials = { username: 'invalidUser', password: 'invalidPassword' };

      const response = await request(app).post('/users/login').send(invalidCredentials);

      expect(response.status).to.equal(401);
    });
  });
});
