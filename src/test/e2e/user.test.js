const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const { app } = require("../../app.js");

const expect = chai.expect;
chai.use(chaiHttp);

let auth;


before((done) => {
    supertest(app)
        .post("/users/login")
        .send({
            email: "Sincere@april.biz",
            password: "Bret",
        })
        .end((err, res) => {
            auth = res.body.token;
            done();
        });
});

describe("Unit API Tests", () => {
    // Test Case: should be able to retrieve all users entity
    it("should be able to retrieve my user entity with or without login", (done) => {
        supertest(app)
            .get("/users")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
