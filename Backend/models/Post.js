// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  votedUsers: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
});

export default mongoose.model("Post", postSchema);