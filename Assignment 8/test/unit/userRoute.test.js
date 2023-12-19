const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");
const { describe, it } = require("mocha");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Routes Unit Tests", () => {
  let authToken;

  before((done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        username: "Aditya",
        password: "aditya@pass12",
      })
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it("should be able to retrieve my user entity", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/2")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
