const { Post } = require("../models/post.js");


const getPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await Post.findAll({
      where: {
        user_id: userId,
      },
    });
    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(500).send("No Posts Found");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getPostById = async (req, res) => {
  let postId;
  try {
    postId = req.params.id;
    const userId = req.userId;
    const post = await Post.findOne({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(400).send(`Post with id ${postId} not found`);
    }
  } catch (error) {
    res.status(400).send(`Post with id ${postId} is NOT FOUND`);
  }
};


const addNewPost = async (req, res) => {
  let post;
  try {
    post = {
      user_id: req.userId,
      title: req.body.title,
      content: req.body.content,
    };
  } catch (error) {
    return res.status(400).send("Invalid fields for Post");
  }
  try {
    post = await Post.create(post);
    res.status(201).send(`Post with id ${post.post_id} is added successfully`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const title = req.body.title;
    const content = req.body.content;
    const updatedFields = {};

    if (title) {
      updatedFields.title = title;
    }
    if (content) {
      updatedFields.content = content;
    }
    const [rowsUpdated] = await Post.update(updatedFields, {
      where: {
        post_id: postId,
        user_id: userId,
      },
    });
    if (rowsUpdated === 1) {
      res.status(200).send(`Post with id ${postId} updated successfully!!`);
    } else {
      res
        .status(400)
        .send(`Post with id ${postId} update is unsuccessful`);
    }
  } catch (error) {
    res.status(400).send("Update Unsuccessful");
  }
};

module.exports = { getPosts, getPostById, addNewPost, updatePostById };
