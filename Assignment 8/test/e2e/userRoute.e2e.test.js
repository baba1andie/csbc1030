const request = require("supertest");
const app = require("../../server");
const { describe, it } = require("mocha");
const expect = require("chai").expect;

let authToken;

before((done) => {
  request(app)
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

describe("User Routes End-to-End Tests", () => {
  it("Should be able to retrieve my user entity", async () => {
    const res = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).to.equal(200);
  });

  it("Should not be able to retrieve a different user entity and return appropriate error code", async () => {
    const res = await request(app)
      .get("/users/2")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).to.equal(403);
  });

  it("Should not be able to retrieve an entity if not authenticated and return appropriate error code", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).to.equal(401);
  });
});
