import express from 'express';
import auth from '../middleware/auth.js';
import { logout } from '../controllers/authController.js';

import {
  signup, verifyOTP, login, googleLogin
} from '../controllers/authController.js';

const router = express.Router();
router.get("/me", auth, (req, res) => {
  res.json({ user: req.user }); 
});

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/logout', logout);

export default router;
