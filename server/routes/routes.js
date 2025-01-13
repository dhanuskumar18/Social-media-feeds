const express = require('express');
const Post = require('../models/postModel');  // Importing the post model

const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const { userName, postContent } = req.body;
  try {
    const newPost = new Post({ userName, postContent });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a post
router.post('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Unlike a post
router.post('/unlike/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes > 0) {
      post.likes -= 1;
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment to a post
router.post('/comment/:id', async (req, res) => {
  const { userName, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ userName, content });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// In routes/routes.js

router.get('/users', (req, res) => {
  Post.aggregate([
    { $group: { _id: "$userName" } },
    { $project: { userName: "$_id", _id: 0 } }
  ])
  .then(users => res.json(users))
  .catch(err => res.status(500).send("Error fetching users"));
});


module.exports = router;
