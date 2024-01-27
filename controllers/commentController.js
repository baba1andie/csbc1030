const { Comment } = require("../models/comment.js");

// Logic To get all Comments
const getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
    });

    if (comments) {
      res.status(200).send(comments);
    } else {
      res.status(500).send("XX No Comments Found XX");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Logic to Create New Comment
const addNewComment = async (req, res) => {
  let comment;
  try {
    comment = {
      post_id: req.params.id,
      text: req.body.text,
    };
  } catch (error) {
    return res.status(400).send("Invalid fields for Comment");
  }
  try {
    comment = await Comment.create(comment);
    res
      .status(201)
      .send(`Comment with id ${comment.comment_id} is added successfully`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Logic for Update Comment by id
const updateCommentById = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const text = req.body.text;

    const updatedFields = {};

    if (text) {
      updatedFields.text = text;
    }
    const [rowsUpdated] = await Comment.update(updatedFields, {
      where: {
        post_id: postId,
        comment_id: commentId,
      },
    });
    if (rowsUpdated === 1) {
      res
        .status(200)
        .send(`Comment with id ${commentId} updated successfully!!`);
    } else {
      res
        .status(400)
        .send(`XX Comment with id ${commentId} update is unsuccessful XX`);
    }
  } catch (error) {
    res.status(400).send("XX Update Unsuccessful XX");
  }
};

// Logic for Delete Comment by id
const deleteCommentById = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  Comment.destroy({
    where: {
      comment_id: commentId,
      post_id: postId,
    },
  })
    .then((numDeletedRows) => {
      if (numDeletedRows > 0) {
        res
          .status(200)
          .send(`Comment with id ${commentId} is Deleted Successfully!!`);
      } else {
        res
          .status(400)
          .send(`XX No Comment with id ${commentId} found to delete XX`);
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
};

module.exports = {
  getComments,
  addNewComment,
  updateCommentById,
  deleteCommentById,
};
