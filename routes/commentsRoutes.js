const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware to validate comment data
const validateCommentData = (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Comment text is required." });
  }
  next();
};

// Routes for comments
router.get("/posts/:postId", commentsController.getCommentsByPostId);

router.post("/posts/:postId", validateCommentData, commentsController.createComment);

router.patch("/:id", validateCommentData, commentsController.updateComment);

router.delete("/:id", commentsController.deleteComment);

module.exports = router;