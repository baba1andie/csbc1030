const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../../index'); 
const User = require('../../model/userModel'); 
let token;

describe('Authentication and User Endpoints', () => {
    before(async () => {
      const credentials = {
        username: 'abcTest',
        password: 'abc@123'
      };
  
      const res = await request(app).post('/users/login').send(credentials);
      token = res.body.token;
    });
    
  describe('User Routes', () => {
    let testUser;

    before(async () => {
      testUser = await User.create({ username: 'abcTests', password: 'abc@123', first_name: 'xyz', last_name: 'test' });
    });

    after(async () => {
      await User.destroy({ where: { id: testUser.id } });
    });

    describe('GET /users/:id', () => {
      it('should be able to retrieve my user entity', async () => {
        const userId = 1;
        const res = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
      });

      it('should not be able to retrieve a different user entity and return appropriate error code', async () => {
        const userId = 100;
        const res = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(403);
      });

      it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
        const res = await request(app).get(`/users/${testUser.id}`);
        expect(res.status).to.equal(401);
      });
    });

    describe('POST /users', () => {
      it('should be able to create a new user', async () => {
        const userData = { username: "xyzTest", password: "xyz@123", first_name: "xyz", last_name: "test" };

        const res = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send(userData);
        expect(res.status).to.equal(201);
      });

      it('should not be able to create a user without required data', async () => {
        const userData = { username: "lmn", password: "xyz@123", first_name: "xyz", email: "ahh@gmail.com" };

        const res = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send(userData);
        expect(res.status).to.equal(500);
      });
    });

    describe('POST /users/login', function() {
      this.timeout(100000);
      it('should be able to login and receive an authentication token', async () => {
        const credentials = {username: 'abcTest', password: 'abc@123'  };

        const res = await request(app).post('/users/login').send(credentials);
        expect(res.status).to.equal(200);
      });

      it('should not be able to login with invalid credentials', async () => {
        const invalidCredentials = { username: 'abcTest', password: 'abc@12'};

        const res = await request(app).post('/users/login').send(invalidCredentials);
        expect(res.status).to.equal(401);
      });
    });
  });
});