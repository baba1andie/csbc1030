const Post = require("../models/postModel");

class PostsService {
  async getAllPosts() {
    try {
      return await Post.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  async getPostById(postId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  async createPost(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

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
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  async deletePost(postId) {
    try {
      const deleted = await Post.destroy({ where: { id: postId } });
      if (!deleted) {
        throw new Error("Post not found");
      }
      return deleted;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }
}

module.exports = new PostsService();