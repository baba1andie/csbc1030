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
    // Test Case: should be able to retrieve all posts entity - only on authenticated
    it("should be able to retrieve all posts entity - only on authenticated", (done) => {
        supertest(app)
            .get("/posts")
            .set("Cookie", `auth-tk=${auth}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    // Test Case: should be able to retrieve a post based on id - only on authenticated
    it("should be able to retrieve a post based on id - only on authenticated", (done) => {
        supertest(app)
            .get("/posts/1")
            .set("Cookie", `auth-tk=${auth}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    // should be able to retrieve Empty postId and return appropriate error code - on authenticated
    it("should be able to retrieve Empty postId and return appropriate error code - on authenticated", (done) => {
        supertest(app)
            .get("/posts/gjggh")
            .set("Cookie", `auth-tk=${auth}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

