const Comment = require('../model/comment');
const Post = require('../model/post');

async function createComment(req, res) {
    try {
        const postId= req.params.id;
        const authenticatedUserId = req.user.userId;

        const post = await Post.findByPk(postId);

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId !== authenticatedUserId ) {
        return res.status(403).json({ error: 'Forbidden: User is allowed to comment' });
        }
        const commentData = {
            postId : postId,
            name : req.body.name,
            email : req.body.email,
            body : req.body.body,
        }
        const newComment = await Comment.create(commentData);
        res.status(201).json(newComment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding comment' });
    }
}

async function getAllCommets(req, res) {
    const postId = req.params.id;
    try {
      const comments = await Comment.findAll({
        where: { postId: postId },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const postId = req.params.id;
  
    try {
      const updateComment = await Comment.findOne({
        where: { id: commentId, postId: postId },
      });

      if (!updateComment) {
        return res.status(404).json({ error: 'comment not found' });
      }

      await updateComment.update({
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
      });
  
      res.status(200).json({ message: 'Comment updated successfully', updatedComment: updateComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error updating comment' });
    }
  }

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  const postId = req.params.id;
  
  try {
    const deleteComment = await Comment.findOne({
      where: { id: commentId, postId: postId },
    });

    if (!deleteComment) {
      return res.status(404).json({ error: 'comment not found' });
    }

    await deleteComment.destroy();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting post' });
  }
}

  
module.exports = {
  createComment,
  getAllCommets,
  updateComment,
  deleteComment
};
  