const Post = require("../models/postModel");

const postsService = {
  // Retrieve all posts
  async getAllPosts() {
    try {
      return await Post.findAll();
    } catch (error) {
      throw new Error("Error fetching posts: " + error.message);
    }
  },

  // Retrieve single post by ID
  async getPostById(postId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error("Error fetching post: " + error.message);
    }
  },

  // Create new post
  async createPost(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw new Error("Error creating post: " + error.message);
    }
  },

  // Update post
  async updatePost(postId, updatedData) {
    try {
      const [updated] = await Post.update(updatedData, {
        where: { id: postId },
      });
      if (!updated) {
        throw new Error("Post not found");
      }
      return updated;
    } catch (error) {
      throw new Error("Error updating post: " + error.message);
    }
  },

  // Delete post
  async deletePost(postId) {
    try {
      const deleted = await Post.destroy({ where: { id: postId } });
      if (!deleted) {
        throw new Error("Post not found");
      }
      return deleted;
    } catch (error) {
      throw new Error("Error deleting post: " + error.message);
    }
  },
};

module.exports = postsService;
