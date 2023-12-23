const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// Middleware to validate post data
function validatePostData(req, res, next) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  next();
}

// Get all posts
router.get("/", postsController.getAllPosts);

// Get a single post by ID
router.get("/:id", postsController.getPostById);

// Create a new post
router.post("/", validatePostData, postsController.createPost);

// Update a post
router.patch("/:id", validatePostData, postsController.updatePost);

// Delete a post
router.delete("/:id", postsController.deletePost);

module.exports = router;
