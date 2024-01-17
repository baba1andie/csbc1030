
import superTest from 'supertest';

const request = superTest('http://localhost:3000');
import { expect }  from 'chai';


describe("users test suite", function () {


    let createdUserId = null;
    let validToken = null;
    it("post new user", async function () {
        const response = await request.post("/users")
            .send({"name":"chandruuu"});

        let usersResponse = JSON.parse(response.text);
        expect(usersResponse.message).to.eql("User added successfully");
        createdUserId = usersResponse.userData.id;
        validToken = usersResponse.userData.token;
        console.log(createdUserId);
        expect(response.status).to.eql(201);
    });


    it("test get all users", async function () {
        const response = await request.get("/users");
        expect(response.status).to.eql(200);
        let usersData = JSON.parse(response.text);
        console.log(usersData);
        let requiredUser = usersData?.find(users => users.id === createdUserId);
        console.log(requiredUser);
        expect(requiredUser.name).to.eql("chandruuu");
    });


    it("should return 401 for unauthorized user token", async function () {
        const response = await request.get("/users/c212879c-57c7-4594-bd7e-5c5243e92f61")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjk1MjUyNH0.Lhv1YEJsCPZFfcqOlJnqEmZed-y6WEihDs5xGbRXIDg');
        expect(response.status).to.eql(403);
    });

    it("should valid user for valid token and user id", async function () {
        console.log('requesting for id ', createdUserId);
        const response = await request.get("/users/"+createdUserId)
            .set('Authorization', 'Bearer '+validToken);
        expect(response.status).to.eql(200);
    });


    it("should return not found for invalid user id", async function () {
        const response = await request.get("/users/randomn")
            .set('Authorization', 'Bearer '+validToken);
        expect(response.status).to.eql(404);
    });


});