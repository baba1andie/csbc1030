
import superTest from 'supertest';

const request = superTest('http://localhost:3000');
import { expect }  from 'chai';


describe("users test suite", function () {


    let createdUserId = null;
    it("post new user", async function () {
        const response = await request.post("/users")
            .send({"name":"chandruuu"});

        let usersResponse = JSON.parse(response.text);

        expect(usersResponse.message).to.eql("User added successfully");
        createdUserId = usersResponse.userData.id;
        console.log(createdUserId);
        expect(response.status).to.eql(201);

    });


    it("test get all users", async function () {
        const response = await request.get("/users");
        let usersData = JSON.parse(response.text);
        console.log(usersData);
        let requiredUser = usersData?.find(users => users.id === createdUserId);
        console.log(requiredUser);
        if(requiredUser){

        }else{

        }
        expect(response.status).to.eql(200);


        // expect(response.body.data.length).to.eql(30);
    });
});