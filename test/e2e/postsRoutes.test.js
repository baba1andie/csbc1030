const request = require("supertest");
const app = require("../../app");
const expect = require("chai").expect;

describe("GET /posts/:id", () => {
  it("responds with a single post", async () => {
    const postId = 1; // Assuming this post ID exists in your test database
    const response = await request(app).get(`/posts/${postId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.id).to.equal(postId);
  });
});
