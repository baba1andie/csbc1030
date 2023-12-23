const { CommentModel } = require("../models/commentModel");

const commentsController = {
  // Fetch all comments for a post
  async getCommentsByPostId(req, res) {
    try {
      const postId = req.params.id;
      const comments = await CommentModel.findAll({
        where: { postId },
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new comment
  async createComment(req, res) {
    try {
      const { postId, userId, text } = req.body; 
      const newComment = await CommentModel.create({ postId, userId, text });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update comment
  async updateComment(req, res) {
    try {
      const { text } = req.body;
      const commentId = req.params.id;
      const updatedComment = await CommentModel.update(
        { text },
        {
          where: { id: commentId },
        }
      );

      if (updatedComment[0] === 0) {
        return res
          .status(404)
          .json({ message: "Comment not found or no changes made" });
      }

      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete comment
  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const deletedComment = await CommentModel.destroy({
        where: { id: commentId },
      });

      if (deletedComment === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = commentsController;
