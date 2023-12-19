const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../../index');

describe('Authentication Routes', () => {
  describe('POST /users/login', () => {
    it('should be able to login and receive an authentication token', async () => {
      const credentials = { username: 'abcTest', password: 'abc@123' };

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
