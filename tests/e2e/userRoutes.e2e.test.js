const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index.js'); // Update the path accordingly
const User = require('../../routes/userRoutes.js'); // Import your User model

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes - End to End Tests', () => {
    it('Should be able to retrieve my user entity', async () => {
        // Create a user with id = 1 in your test database

        const userToCreate = {
            email: 'shubham@gmail.com',
            password: 'Shubham', // Make sure to hash the password if necessary
            name: 'Shubham',
            country: 'India',
            MOA: 'September',
            // Other user properties...
        };

        const loginResponse = await chai.request(app)
            .post('/users/login')
            .send({ email: 'shubham@gmail.com', password: 'Shubham' }); // Replace with actual credentials

        const authToken = loginResponse.body.data.accessToken;

        const response = await chai.request(app)
            .get('/users/1')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response).to.have.status(200);
        expect(response.body.id).to.equal(1);        // Replace with your expected user data
    });

    it('should not be able to retrieve a different user entity and return appropriate error code', async () => {
        // Create a user with id = 2 in your test database
        const userToCreate = {
            email: 'shubh@gmail.com',
            password: '123', // Make sure to hash the password if necessary
            name: 'Shubham',
            country: 'India',
            MOA: 'September',
            // Other user properties...
        };

        const loginResponse = await chai.request(app)
            .post('/users/login')
            .send({ email: 'shubh@gmail.com ', password: '123' }); // Replace with actual credentials

        const authToken = loginResponse.body.data.accessToken;

        const response = await chai.request(app)
            .get('/users/2')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response).to.have.status(401); // Unauthorized
        expect(response.body.message).to.equal('This User is Not Authorized to access this URL');
    });

    it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
        const response = await chai.request(app)
            .get('/users/1');

        expect(response).to.have.status(401); // Unauthorized
        expect(response.body.message).to.equal('Unauthorized - User not logged in');
    });
});
