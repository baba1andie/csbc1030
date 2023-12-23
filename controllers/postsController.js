const { PostModel } = require("../models/postModel");
const postsController = {
  // Fetch all posts
  async getAllPosts(req, res) {
    try {
      const posts = await PostModel.findAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fetch single post by ID
  async getPostById(req, res) {
    try {
      const post = await PostModel.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new post
  async createPost(req, res) {
    try {
      const { title, content, userId } = req.body; 
      const newPost = await PostModel.create({ title, content, userId });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update post
  async updatePost(req, res) {
    try {
      const { title, content } = req.body;
      const updatedPost = await PostModel.update(
        { title, content },
        {
          where: { id: req.params.id },
        }
      );

      if (updatedPost[0] === 0) {
        return res
          .status(404)
          .json({ message: "Post not found or no changes made" });
      }

      res.json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete post
  async deletePost(req, res) {
    try {
      const deletedPost = await PostModel.destroy({
        where: { id: req.params.id },
      });

      if (deletedPost === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = postsController;
