// postController.js
const { Post } = require('../models/postModel');

// Controller method to create a new post
const createPost = async (req, res) => {
    try {
        // Assuming the request body contains the post data
        const postData = req.body;

        // Create a new post using the Post model
        const newPost = await Post.create(postData);

        // Send the newly created post as the response
        res.status(201).json(newPost);
    } catch (error) {
        // Handle any errors during the creation of the post
        res.status(500).json({ error: error.message });
    }
};

// Controller method to fetch all posts by a user
const getAllPostsByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to extract the user from the JWT

        const posts = await Post.findAll({ where: { UserId: userId } });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { createPost, getAllPostsByUser };
