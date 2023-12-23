const express = require("express");
const router = express.Router();
const {
  getComments,
  addNewComment,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/commentController.js");

router.get("/:id/comments", getComments);

router.post("/:id/comments", addNewComment);

router.patch("/:id/comments/:commentId", updateCommentById);

router.delete("/:id/comments/:commentId", deleteCommentById);

module.exports = router;
