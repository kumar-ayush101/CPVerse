import mongoose from "mongoose";

const cfUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  codeforcesHandle: {
    type: String,
    required: true,
    unique: true,
  },
  verifyToken: {
    type: String,
    required: true,
  },
  verifyTokenIssuedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  connectedAt: {
    type: Date,
    default: Date.now,
  },
  importantQuestions: {
  type: [String],
  default: []
   },

});

export default mongoose.model("CFUser", cfUserSchema);
