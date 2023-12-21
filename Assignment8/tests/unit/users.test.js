const supertest = require('supertest');
const app = require('../../src/index'); 

describe('GET /users/:id - Basic Unit Tests', () => {
    it('Test if we can retrieve a user (assuming authentication is always successful)', async () => {
        
        const response = await supertest(app).get('/users/1');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', 1); 
    });

    it('Test if we get an error when trying to access a non-existent user', async () => {
        
        const response = await supertest(app).get('/users/999');

        expect(response.statusCode).toBe(404); 
    });
});
