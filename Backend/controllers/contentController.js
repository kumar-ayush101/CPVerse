import Post from "../models/Post.js";
import Doubt from "../models/Doubt.js";
import Draft from "../models/Draft.js";

export const createPost = async (req, res) => {
  try {
    const post = new Post({
      text: req.body.text,
      user: req.user._id 
    });
    await post.save();
    res.status(201).json({ message: "Post created" });
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};



export const createDoubt = async (req, res) => {
  try {
    console.log("Received doubt:", req.body.text);
    const doubt = new Doubt({ text: req.body.text, user: req.user._id });
    await doubt.save();
    res.status(201).json({ message: "Doubt created" });
  } catch (err) {
    console.error("Error creating doubt:", err);  
    res.status(500).json({ message: "Error creating doubt" });
  }
};


export const createFact = async (req, res) => {
  try {
    const fact = new Draft({
      text: req.body.text,
      user: req.user._id  
    });
    await fact.save();
    res.status(201).json({ message: "Draft saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving draft" });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ likes: -1 })
      .populate("user", "name"); 
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


export const likePost = async (req, res) => {
  const { id } = req.params;
  const user = req.ip;

  try {
    const post = await Post.findById(id);
    if (post.votedUsers.includes(user)) {
      return res.status(400).json({ message: "Already voted" });
    }

    post.likes += 1;
    post.votedUsers.push(user);
    await post.save();

    res.json({ message: "Post liked" });
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
};


export const dislikePost = async (req, res) => {
  const { id } = req.params;
  const user = req.ip;

  try {
    const post = await Post.findById(id);
    if (post.votedUsers.includes(user)) {
      return res.status(400).json({ message: "Already voted" });
    }

    post.dislikes += 1;
    post.votedUsers.push(user);
    await post.save();

    res.json({ message: "Post disliked" });
  } catch (err) {
    res.status(500).json({ message: "Failed to dislike post" });
  }
};


export const getDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch doubts" });
  }
};


export const addReplyToDoubt = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const doubt = await Doubt.findById(id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    
    console.log(`Reply to ${id}: ${text}`);
    res.status(200).json({ message: "Reply added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDrafts = async (req, res) => {
  try {
    const drafts = await Draft.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(drafts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};

