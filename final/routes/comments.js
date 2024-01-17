import {authenticateToken} from "../auth/authorizer.js";

import { Comment }  from "../dao/comment.js";

import Router from "express";

const commentsRoutes = Router();

commentsRoutes.get("/" ,(req, res) => {
        try {
            const comments =  Comment.findAll({ where: { postId } });
            res.send(comments);
        } catch (error) {
            throw new Error("Error fetching comments: " + error.message);
        }
    });

commentsRoutes.get("/:id", authenticateToken, (req, res) => {
    let commentId = req.params.id;
    try{
        const post = Comment.findByPk(commentId);
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    } catch (error) {
        throw new Error("Error fetching post: " + error.message);
    }
});

// Create a new comment
commentsRoutes.post("/", (req, res) => {
    try {
        let comment = req.body;
        let commentData = Comment.create(comment)
        res.status(201).send(commentData) ;
    } catch (error) {
        throw new Error("Error creating post: " + error.message);
    }
});


commentsRoutes.update("/:id",(req, res) => {

    let commentId = req.params.id;
    try {
        const [updated] = Comment.update(updatedData, {
            where: { id: commentId },
        });
        if (!updated) {
            throw new Error("Post not found");
        }
        res.send(updated);
    } catch (error) {
        throw new Error("Error updating post: " + error.message);
    }
});

// Delete a comment
commentsRoutes.delete("/:id",(req, res) => {

    let commentId = req.params.id;
    try {
        const deleted = Comment.destroy({ where: { id: commentId } });
        if (!deleted) {
            throw new Error("Post not found");
        }
        res.send(deleted) ;
    } catch (error) {
        throw new Error("Error deleting post: " + error.message);
    }
});

export {commentsRoutes}