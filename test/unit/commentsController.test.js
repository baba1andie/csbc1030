const { expect } = require("chai");
const sinon = require("sinon");
const commentsController = require("../../controllers/commentsController");
const CommentModel = require("../../models/commentModel");

describe("commentsController", () => {
  describe("createComment", () => {
    it("should create a new comment", async () => {
      const req = {
        body: { postId: 1, userId: 1, text: "Test comment" },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Stubbing the entire CommentModel
      sinon
        .stub(CommentModel, "create")
        .callsFake(() => Promise.resolve(req.body));

      await commentsController.createComment(req, res);

      // Debugging output
      console.log("Status Code:", res.status.args);
      console.log("JSON Response:", res.json.args);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has("text", req.body.text))).to.be
        .true;

      // Restore the original function
      CommentModel.create.restore();
    });
  });
});
