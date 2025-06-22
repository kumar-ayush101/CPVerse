import express from "express";
import auth from "../middleware/auth.js";
import {
  createPost,
  createDoubt,
  createFact,
  getPosts,
  getDoubts,
  likePost,
  dislikePost,
  addReplyToDoubt,
  getDrafts,
} from "../controllers/contentController.js";

const router = express.Router();

router.post("/posts",auth, createPost);
router.post("/doubts",auth, createDoubt);
router.post("/drafts", auth, createFact);
router.post("/doubts/:id/reply", addReplyToDoubt);



router.get("/posts",auth, getPosts);
router.get("/doubts",auth, getDoubts);
router.get("/drafts",auth, getDrafts); 
router.post("/posts/:id/like",auth, likePost);
router.post("/posts/:id/dislike",auth, dislikePost);

export default router;
