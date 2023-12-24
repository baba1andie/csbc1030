// postController.js

const { Post } = require('../models/postModel');
const { User } = require('../models/userModel');
const { Comment } = require('../models/commentModel');

// Controller method to fetch all posts by a user
const getAllPostsByUser = async (req, res) => {
    try {
        const users = await Post.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostsByUserID = async (req, res) => {
    try {


        console.log("this is in getPostsByUserID  " + req.params.id);
        const userId = req.user.userId;
        const Id = req.params.id;  // Assuming you have middleware to extract the user from the JWT


        const posts = await Post.findAll({ where: { UserId: userId, id: Id } });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// error in this function  it takes it takes comment table but 'createdAt' and 'updateAt'
const getPostsByUserIdAndComment = async (req, res) => {
    try {


        console.log("this is in getPostsByUserID  " + req.params.id);
        // const I = req.params.id; // Assuming you have middleware to extract the user from the JWT
        const PostId = req.params.postId;


        const posts = await Comment.findAll({ where: { postId: PostId } });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller method to create a new post
const createPost = async (req, res) => {
    try {
console.log(req.user);
        // Assuming the request body contains the post data
        const postData = {
            userId: req.user.userId,
            title: req.body.title,
            body: req.body.body
        };

        // Create a new post using the Post model
        const newPost = await Post.create(postData);

        // Send the newly created post as the response
        res.status(201).json(newPost);
    } catch (error) {
        // Handle any errors during the creation of the post
        res.status(500).json({ error: error.message });
    }
};



// Controller method to create a new Comment
const createComment = async (req, res) => {

    try {

        // Assuming the request body contains the Comment data
        const commentData = {
            postId: req.params.postId,
            name: req.user.userName,
            email: req.user.userEmail,
            body: req.body.body
        };

        // Create a Comment post using the Comment model
        const newComment = await Comment.create(commentData);

        // Send the newly created post as the response
        res.status(201).json(newComment);
    } catch (error) {
        // Handle any errors during the creation of the post
        res.status(500).json({ error: error.message });
    }
};


// Function to update a post by ID
const updatePostById = async (req, res) => {

    //const { Title, Content } = req.body;

    try {
        console.log("this is Post update block"
            + req.params.postId);

        const Id = req.params.postId;
        const UserId = req.user.userId;
        const Title = req.body.title;
        const Body = req.body.body;
        const updatedPost = await Post.update({ title: Title, content: Body }, { where: { id: Id } && { userId: UserId } });

        if (updatedPost[0] === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// error in this function  it takes it takes comment table but 'createdAt' and 'updateAt'
// Function to update a comment by ID
const updateCommentById = async (req, res) => {
    // const Id = req.params.id;
    //const Comment1 = req.params.comment;

    try {
        console.log("this is Comment update block");
        // Assuming you have a Comment model
        // Replace 'Comment' with your actual model name
        // const updatedComment = await Comment.update({ comment }, { where: { id } });
        const Id = req.params.commentId; // Assuming you have middleware to extract the user from the JWT
        const body = req.body.body;
        const name = req.user.userName;
        const email = req.user.userEmail;
        const PostId = req.params.postId;

        //console.log("this is ID" + Id, "Comment1 is" + Comment1);




        // Placeholder code (modify based on your actual Comment model)
        const updatedComment = await Comment.findOne({ id: Id, postId: PostId });

        if (!updatedComment) {
            return res.status(404).json({ error: 'comment not found' });
        }

        await Comment.update({
            name: name,
            email: email,
            body: body,
        }, {
            where: {
                id: Id,
                postId: PostId,
            },
        });


        // if (updatedComment[0] === 0) {
        //     return res.status(404).json({ error: 'Comment not found' });
        // }

        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const deleteCommentById = async (req, res) => {
//     try {

//         const Id = req.params.id;
//         const deletedComment = await Comment.destroy({ where: { id: Id } });

//         if (!deletedComment) {
//             return res.status(404).json({ error: 'Comment not found' });
//         }

//         res.status(200).json({ message: 'Comment deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting comment:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const deleteCommentById = async (req, res) => {

    try {
        console.log("in the delete block");
        console.log("in the delete block" + req.params.commentId);
        // Assuming you have a Comment model
        // Replace 'Comment' with your actual model name
        // const deletedComment = await Comment.destroy({ where: { id } });

        // Placeholder code (modify based on your actual Comment model)
        const Id = req.params.commentId;
        const PostId = req.params.postId;
        //console.log('Id', Comment)
        const deletedComment = await Comment.destroy({ where: { id: Id } && { postId: PostId } });

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPost, getAllPostsByUser, getPostsByUserID, getPostsByUserIdAndComment, updatePostById, updateCommentById, deleteCommentById, createComment };
