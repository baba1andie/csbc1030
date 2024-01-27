const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const { app, server } = require("../../index.js");

const expect = chai.expect;
chai.use(chaiHttp);

let authToken;

before((done) => {
  supertest(app)
    .post("/api/users/login")
    .send({
      email: "asl@gmail.com",
      password: "123",
    })
    .end((err, res) => {
      authToken = res.body.token;
      done();
    });
});

describe("e2e API Tests", () => {
  // Test Case 1: should be able to retrieve my user entity
  it("should be able to retrieve all users entity with or without login", (done) => {
    supertest(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// Add a cleanup function to close the server after tests
after((done) => {
  server.close(() => {
    done();
  });
});
