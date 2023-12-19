const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Unit Tests", () => {
  const validToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IlByZ3lhIn0sImlhdCI6MTcwMjk2NDYzOCwiZXhwIjoxNzAyOTY4MjM4fQ.HRqbIn6fF4IoetZZrxBxWBnTDGoTvlNF1OHP9WLmwf8";

  it("should be able to retrieve my user entity", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/2")
      .set("Authorization", `Bearer ${validToken}`)
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