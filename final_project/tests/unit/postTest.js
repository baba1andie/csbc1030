const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const { app } = require("../../index.js");

const expect = chai.expect;
chai.use(chaiHttp);

let authToken;
const port = 3111;
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
  // Test Case: should be able to retrieve all posts entity - only on authenticated
  it("should be able to retrieve all posts entity - only on authenticated", (done) => {
    supertest(app)
      .get("/api/posts")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case: should be able to retrieve a post based on id - only on authenticated
  it("should be able to retrieve a post based on id - only on authenticated", (done) => {
    supertest(app)
      .get("/api/posts/1")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // should not be able to retrieve non-existing postId and return appropriate error code - on authenticated
  it("should not be able to retrieve non-existing postId and return appropriate error code - on authenticated", (done) => {
    supertest(app)
      .get("/api/posts/ssf")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

after(() => {
  server.close();
});
