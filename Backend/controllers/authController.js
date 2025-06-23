import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists. Try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({ name, email, password: hashedPassword, otp });
    await newUser.save();

    await transporter.sendMail({
      to: email,
      subject: "OTP Verification for CPVerse signup",
      html: `<p>Your OTP for the signup process is :  <b>${otp}</b></p>`
    });

    return res.status(200).json({ message: "OTP sent to your email." });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error during signup." });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP. Please try again." });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return res.status(200).json({ message: "User successfully verified!" });

  } catch (error) {
    console.error("OTP Verification error:", error);
    return res.status(500).json({ message: "Something went wrong during OTP verification." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist." });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    
    res.cookie('token', token, {
  httpOnly: true,
  secure: true, 
  sameSite: 'none', 
  maxAge: 24 * 60 * 60 * 1000
});

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error during login." });
  }
};


export const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ message: "Missing Google user details." });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, isVerified: true, googleId });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ message: "Google login successful" });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Something went wrong with Google login." });
  }
};




export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).json({ message: "Logged out successfully" });
};