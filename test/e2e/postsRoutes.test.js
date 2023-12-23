const request = require("supertest");
const app = require("../../app");
const { expect } = require("chai");

describe("GET /posts/:id", () => {
  it("should respond with a single post", async () => {

    const postId = 1; 

    
    const response = await request(app).get(`/posts/${postId}`); 
    
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.id).to.equal(postId);
  });
});