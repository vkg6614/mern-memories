const express = require("express");

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  commentPost,
} = require("../controllers/posts.js");

const { auth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

// http://localhost:5000/posts/${id}/commentPost frontend

// /posts/:id/commentPost  backend

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.patch("/:id/commentPost", auth, commentPost);

module.exports = router;
