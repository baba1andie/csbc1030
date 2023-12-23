const Post = require('../model/post');

async function createPost(req, res) {
    try {
      const authenticatedUserId = req.user.userId;
      console.log(req.user);
        const postData = {
            userId : authenticatedUserId,
            title : req.body.title,
            body : req.body.body
        }
        const newPost = await Post.create(postData);
        res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Error creating post' });
    }
}

async function getAllPosts(req, res) {
    const userIdFromToken = req.user.userId; 
    try {
      const posts = await Post.findAll({
        where: { userId: userIdFromToken },
      });
      res.status(201).json({ message: 'Successfully fetch all posts', data: posts });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
}

async function getPostById(req, res) {
    const postId = req.params.id;
    const authenticatedUserId = req.user.userId;
  
    try {
      
      const post = await Post.findByPk(postId);
      // console.log(post);
      if (post.userId == authenticatedUserId) {
          if (!post) {
              return res.status(404).json({ error: 'Access denied' });
            }
        
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  }

async function updatePost(req, res) {
    const postId = req.params.id; 
    const userIdFromToken = req.user.userId;
  
    try {
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.userId !== userIdFromToken) {
        return res.status(403).json({ error: 'Forbidden: Access denied' });
      }
  
      await post.update({
        title: req.body.title, 
        body: req.body.body,
      });
  
      res.json({ message: 'Post updated successfully', updatedPost: post });
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
  }
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost
  };
  