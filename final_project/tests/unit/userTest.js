const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const { app } = require("../../index.js");

const expect = chai.expect;
chai.use(chaiHttp);

let authToken;
const port = 3112;
const server = app.listen(port, () =>
  console.log(`Application running in port ${port}`),
);

before((done) => {
  supertest(app)
    .post("/api/users/login")
    .send({
      email: "a@mail.com",
      password: "123",
    })
    .end((err, res) => {
      authToken = res.body.token;
      done();
    });
});

describe("Unit API Tests", () => {
  // Test Case: should be able to retrieve all users entity
  it("should be able to retrieve my user entity with or without login", (done) => {
    supertest(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

after(() => {
  server.close();
});
