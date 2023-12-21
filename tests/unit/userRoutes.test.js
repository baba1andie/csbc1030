const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index'); // Update the path accordingly
const User = require('../../routes/userRoutes'); // Import your User model

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes - Unit Tests', () => {
    let authToken;

    beforeEach(async () => {
        // Login as user with id = 1 to get authentication token
        const loginResponse = await chai.request(app)
            .post('/users/login')
            .send({ email: 'shubham@gmail.com', password: 'Shubham' }); // Replace with actual credentials
        authToken = loginResponse.body.data.accessToken;
    });

    // Test Case 1
    // it('should be able to retrieve my user entity', async () => {
    //     const userId = 1;
    //     const res = await chai.request(app)
    //         .get(`/users/user/${userId}`)
    //         .set('Authorization', `Bearer ${authToken}`);
    //     expect(res.status).to.equal(200);
    //     // Add more expectations based on your user data
    // });
    // Test Case 1
    it('should be able to retrieve my user entity', async () => {
        const userId = 1;
        const res = await chai.request(app)
            .get(`/users/user/${userId}`)
            .set('Authorization', `Bearer ${authToken}`);

        // Log the response for debugging purposes
        console.log(res.status, res.body);

        expect(res.status).to.equal(200);
        // Add more expectations based on your user data
    });


    // Test Case 2
    it('should not be able to retrieve a different user entity and return appropriate error code', async () => {
        const userId = 2;
        const response = await chai.request(app)
            .get(`/users/user/3`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(response.status).to.equal(401); // Update to the correct status code
        // Add more expectations based on your error response
    });

    // Test Case 3
    it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
        const response = await chai.request(app)
            .get('/users/user/1');
        expect(response.status).to.equal(401); // Update to the correct status code
        // Add more expectations based on your error response
    });


    // it('should be able to retrieve my user entity', async () => {
    //     console.log(authToken);
    //     const userId = 1;
    //     const res = await chai.request(app).get(`/users/user/${userId}`).set('Authorization', `Bearer ${authToken}`);
    //     expect(res.status).to.equal(200);

    //     // const response = await chai.request(app)
    //     //     .get('/users/1')
    //     //     .set('Authorization', `Bearer ${authToken}`);

    //     // console.log(response);
    //     // //expect(response).to.have.status(200);
    //     // expect(response.status).to.equal(200);

    //     //  expect(response.body.id).to.equal(1); // Replace with your expected user data
    // });

    // it('should not be able to retrieve a different user entity and return appropriate error code', async () => {
    //     const response = await chai.request(app)
    //         .get('user/users/2')
    //         .set('Authorization', `Bearer ${authToken}`);

    //     expect(response).to.have.status(403); // Unauthorized
    //     //expect(response.body.message).to.equal('This User is Not Authorized to access this URL');
    // });

    // it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
    //     const response = await chai.request(app)
    //         .get('/users/1');

    //     expect(response).to.have.status(404); // Unauthorized
    //     expect(response.body.message).to.equal('Unauthorized - User not logged in');
    // });
});
