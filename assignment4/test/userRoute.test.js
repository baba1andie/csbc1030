const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /users/:id", () => {
  it("should be able to retrieve my user entity", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/2")
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
