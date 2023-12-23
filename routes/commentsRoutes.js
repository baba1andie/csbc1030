const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware to validate comment data
function validateCommentData(req, res, next) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Comment text is required." });
  }
  next();
}

// Get all comments for a specific post
router.get("/posts/:postId", commentsController.getCommentsByPostId);

// Create a new comment
router.post(
  "/posts/:postId",
  validateCommentData,
  commentsController.createComment
);

// Update a comment
router.patch("/:id", validateCommentData, commentsController.updateComment);

// Delete a comment
router.delete("/:id", commentsController.deleteComment);

module.exports = router;
