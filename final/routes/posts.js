import {authenticateToken} from "../auth/authorizer.js";

import { Post }  from "../dao/post.js";

import Router from "express";

const postsRoutes = Router();

postsRoutes.get("/" ,(req, res) => {
        try {
            console.log("Attempting to fetch all posts...");
            const posts = Post.findAll();
            console.log("Fetched all posts successfully.");
            res.send(posts);
        } catch (error) {
            console.error("Error fetching posts:", error.message);
            throw new Error("Error fetching posts: " + error.message);
        }
    });


postsRoutes.get("/:id", authenticateToken, (req, res) => {
    let postId = req.params.id;
    try{
            const post = Post.findByPk(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } catch (error) {
            throw new Error("Error fetching post: " + error.message);
        }
    });

    // Create a new post
    usersRoutes.post("/", (req, res) => {
        try {
            let post = req.body;
            let postData = Post.create(post)
            res.status(201).send(postData) ;
        } catch (error) {
            throw new Error("Error creating post: " + error.message);
        }
    });


usersRoutes.update("/:id",(req, res) => {

    let postId = req.params.id;
        try {
            const [updated] = Post.update(updatedData, {
                where: { id: postId },
            });
            if (!updated) {
                throw new Error("Post not found");
            }
            res.send(updated);
        } catch (error) {
            throw new Error("Error updating post: " + error.message);
        }
    });

// Delete a post
usersRoutes.delete("/:id",(req, res) => {

    let postId = req.params.id;
        try {
            const deleted = Post.destroy({ where: { id: postId } });
            if (!deleted) {
                throw new Error("Post not found");
            }
            res.send(deleted) ;
        } catch (error) {
            throw new Error("Error deleting post: " + error.message);
        }
    });

export {postsRoutes}