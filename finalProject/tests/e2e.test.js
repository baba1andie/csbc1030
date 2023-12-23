const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let token;
const app = require('../index');

describe('Authentication and User Endpoints', () => {
  before(async () => {
    const credentials = {
      username: 'pooja123',
      password: 'abc@123'
    };

    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
  });

  describe('GET /posts/:id/comments - get all comments for a post', () => {
    it('should fetch all comments for a post', async () => {
        const postId = 1;
        const res = await request(app).get(`/posts/${postId}/comments`).set('Authorization', `Bearer ${token}`)

        expect(res.status).to.equal(200);
    });
  });

})