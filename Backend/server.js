import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import cfUserRoutes from './routes/cfUserRoutes.js';

import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js'; 

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://cpverse.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/cfuser', cfUserRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  })
  .catch(err => console.error(err));
