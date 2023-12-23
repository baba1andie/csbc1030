const Comment = require("../models/commentModel");

const CommentsService = {
  // Retrieve comments regarding a specific post
  getCommentsByPostId: async (postId) => {
    try {
      return await Comment.findAll({ where: { postId } });
    } catch (error) {
      throw new Error("Failed to fetch comments: " + error.message);
    }
  },

  // Create a new comment
  createComment: async (commentData) => {
    try {
      return await Comment.create(commentData);
    } catch (error) {
      throw new Error("Failed to create comment: " + error.message);
    }
  },

  // Update a comment
  updateComment: async (commentId, updatedData) => {
    try {
      const [updated] = await Comment.update(updatedData, {
        where: { id: commentId },
      });
      if (!updated) {
        throw new Error("Comment not found");
      }
      return updated;
    } catch (error) {
      throw new Error("Failed to update comment: " + error.message);
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const deleted = await Comment.destroy({ where: { id: commentId } });
      if (!deleted) {
        throw new Error("Comment not found");
      }
      return deleted;
    } catch (error) {
      throw new Error("Failed to delete comment: " + error.message);
    }
  },
};

module.exports = CommentsService;