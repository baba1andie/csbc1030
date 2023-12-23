const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// Middleware to validate post data
const validatePostData = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  next();
};

// Routes for posts
router.get("/", postsController.getAllPosts);

router.get("/:id", postsController.getPostById);

router.post("/", validatePostData, postsController.createPost);

router.patch("/:id", validatePostData, postsController.updatePost);

router.delete("/:id", postsController.deletePost);

module.exports = router;