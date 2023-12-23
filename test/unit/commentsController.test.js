const { expect } = require("chai");
const sinon = require("sinon");
const commentsController = require("../../controllers/commentsController");
const CommentModel = require("../../models/commentModel");

describe("commentsController", () => {
  describe("createComment", () => {
    it("should create a new comment", async () => {
      // Arrange
      const req = {
        body: { postId: 1, userId: 1, text: "Test comment" },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Stubbing the CommentModel.create function
      const createStub = sinon.stub(CommentModel, "create").resolves(req.body);

      // Act
      await commentsController.createComment(req, res);

      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has("text", req.body.text))).to.be.true;

      // Clean up
      createStub.restore();
    });
  });
});