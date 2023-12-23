const { PostModel } = require("../models/postModel");

const handleControllerErrors = (res, error) => {
  console.error("Controller error:", error);
  res.status(500).json({ error: error.message });
};

const postsController = {
  getAll: async (req, res) => {
    try {
      const posts = await PostModel.findAll();
      res.json(posts);
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const post = await PostModel.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { title, content, userId } = req.body;
      const newPost = await PostModel.create({ title, content, userId });
      res.status(201).json(newPost);
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { title, content } = req.body;
      const postId = req.params.id;
      const [updatedCount] = await PostModel.update(
        { title, content },
        { where: { id: postId } }
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "Post not found or no changes made" });
      }

      res.json({ message: "Post updated successfully" });
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedCount = await PostModel.destroy({ where: { id: postId } });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      handleControllerErrors(res, error);
    }
  },
};

module.exports = postsController;