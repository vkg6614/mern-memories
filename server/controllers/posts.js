const { PostMessage } = require("../models/postMessage.js");

const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.create({
      ...req.body,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json(postMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("this id is not present");

  const updateMessage = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updateMessage);
};

const deletePost = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("this id is not present");

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

const likePost = async (req, res) => {
  const id = req.params.id;
  if (!req.userId) return res.json({ message: "Unauthorized" });

  if (!id) return res.status(404).send("this id is not present");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPosts,
  getPostsBySearch,
  getPost,
};
