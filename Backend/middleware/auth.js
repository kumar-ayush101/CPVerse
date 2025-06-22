import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }
     console.log("Cookies received:", req.cookies);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'User is not verified.' });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error('Authentication error:', err.message); 
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default auth;
