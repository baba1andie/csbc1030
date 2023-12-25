// Import the Post model
const Post = require("../models/postModel");
const { sequelize } = require("../database");

const postsService = {
  // Retrieve all posts
  async getAllPosts() {
    try {
      console.log("Attempting to fetch all posts...");
      const posts = await Post.findAll();
      console.log("Fetched all posts successfully.");
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw new Error("Error fetching posts: " + error.message);
    }
  },
  // Retrieve a single post by ID
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

  // Create a new post
  async createPost(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw new Error("Error creating post: " + error.message);
    }
  },

  // Update a post
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

  // Delete a post
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
