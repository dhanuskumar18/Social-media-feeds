const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  userName: String,
  postContent: String,
  likes: { type: Number, default: 0 },
  comments: [{ userName: String, content: String }],
}, { timestamps: true }); 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
