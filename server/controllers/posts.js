import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.create(req.body);
    res.status(201).json(postMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("this id is not present");

  const updateMessage = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updateMessage);
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("this id is not present");

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("this id is not present");

  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );

  res.json(updatePost);
};
