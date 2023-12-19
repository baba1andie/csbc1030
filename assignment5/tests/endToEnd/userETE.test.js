const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let token;
const app = require('../../index');
describe('Authentication and User Endpoints', () => {
  before(async () => {
    const credentials = {
      username: 'abcTest',
      password: 'abc@123'
    };

    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
  });

  describe('User Endpoints', () => {
    describe('GET /users', () => {
      it('should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).to.equal(200);
      });
    });

    describe('GET /users/:id', () => {
      it('should get a single user by ID', async () => {
        const userId = 1;
        const res = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
      });

      it('should return 404 if user ID does not exist', async () => {
        const nonExistingUserId = 999;
        const res = await request(app).get(`/users/${nonExistingUserId}`);
        expect(res.status).to.equal(401);
      });
    });

    describe('POST /users', () => {
      it('should create a new user', async () => {
        const userData = {
          username: 'newUser',
          password: 'new@User',
          first_name: 'aaa',
          last_name: 'bbb'
        };

        const res = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send(userData);
        expect(res.status).to.equal(201);
      });

      it('should not create a user with invalid data', async () => {
        const invalidUserData = {
          password: 'password123',
          fisrt_name: 'aa',
          last_name: 'bb'
        };

        const res = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send(invalidUserData);
        expect(res.status).to.equal(500);
      });
    });
  });
});