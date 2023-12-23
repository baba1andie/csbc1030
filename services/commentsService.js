const Comment = require("../models/commentModel");

const commentsService = {
  // Retrieve comments regarding specific post
  async getCommentsByPostId(postId) {
    try {
      return await Comment.findAll({ where: { postId } });
    } catch (error) {
      throw new Error("Error fetching comments: " + error.message);
    }
  },

  // Create new comment
  async createComment(commentData) {
    try {
      return await Comment.create(commentData);
    } catch (error) {
      throw new Error("Error creating comment: " + error.message);
    }
  },

  // Update comment
  async updateComment(commentId, updatedData) {
    try {
      const [updated] = await Comment.update(updatedData, {
        where: { id: commentId },
      });
      if (!updated) {
        throw new Error("Comment not found");
      }
      return updated;
    } catch (error) {
      throw new Error("Error updating comment: " + error.message);
    }
  },

  // Delete comment
  async deleteComment(commentId) {
    try {
      const deleted = await Comment.destroy({ where: { id: commentId } });
      if (!deleted) {
        throw new Error("Comment not found");
      }
      return deleted;
    } catch (error) {
      throw new Error("Error deleting comment: " + error.message);
    }
  },
};

module.exports = commentsService;
