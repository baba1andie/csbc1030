 const { CommentModel } = require("../models/commentModel");

const handleControllerErrors = (res, error) => {
  console.error("Controller error:", error);
  res.status(500).json({ error: error.message });
};

const commentsController = {
  getAllByPostId: async (req, res) => {
    try {
      const postId = req.params.id;
      const comments = await CommentModel.findAll({ where: { postId } });
      res.json(comments);
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { postId, userId, text } = req.body;
      const newComment = await CommentModel.create({ postId, userId, text });
      res.status(201).json(newComment);
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { text } = req.body;
      const commentId = req.params.id;
      const [updatedCount] = await CommentModel.update(
        { text },
        { where: { id: commentId } }
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "Comment not found or no changes made" });
      }

      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      const commentId = req.params.id;
      const deletedCount = await CommentModel.destroy({
        where: { id: commentId },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },
};

module.exports = commentsController;