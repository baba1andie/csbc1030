const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  addNewPost,
  updatePostById,
} = require("../controllers/postController.js");

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", addNewPost);

router.patch("/:id", updatePostById);

module.exports = router;
