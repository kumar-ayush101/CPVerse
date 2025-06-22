import CFUser from "../models/CFUser.js";
import axios from "axios";

// Generating token and store timestamp
export const initiateCFHandleVerification = async (req, res) => {
  const { cfHandle } = req.body;
  const userId = req.user._id;

  const token = Math.random().toString(36).substring(2, 10);

  try {
    let user = await CFUser.findOne({ userId });

    if (!user) {
      user = new CFUser({
        userId,
        codeforcesHandle: cfHandle,
        verifyToken: token,
        verifyTokenIssuedAt: Date.now(),
      });
    } else {
      user.codeforcesHandle = cfHandle;
      user.verifyToken = token;
      user.verifyTokenIssuedAt = Date.now();
      user.isVerified = false;
    }

    await user.save();

    res.json({
      message: "Submit any solution with a Compilation Error within 2 minutes on Codeforces.",
      token, 
    });
  } catch (err) {
    console.error("Verification initiation error:", err.message);
    res.status(500).json({ message: "Failed to initiate verification" });
  }
};

//  Verifying by timestamp and verdict
export const verifyCFHandleSubmission = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await CFUser.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { data } = await axios.get(
      `https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}&from=1&count=20`
    );

    const recentSubmissions = data.result;

    const matched = recentSubmissions.some(sub => {
      const submissionTime = new Date(sub.creationTimeSeconds * 1000);
      return (
        sub.verdict === "COMPILATION_ERROR" &&
        submissionTime > user.verifyTokenIssuedAt
      );
    });

    if (matched) {
      user.isVerified = true;
      await user.save();
      res.json({ message: "Codeforces handle verified successfully!" });
    } else {
      res.status(400).json({
        message:
          "No matching recent COMPILATION_ERROR submission found after verification started.",
      });
    }
  } catch (err) {
    console.error("Verification check error:", err.message);
    res.status(500).json({ message: "Verification failed" });
  }
};

export const getCFUserStatus = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await CFUser.findOne({ userId });

    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "Codeforces account not verified yet." });
    }

    const { data } = await axios.get(
      `https://codeforces.com/api/user.info?handles=${user.codeforcesHandle}`
    );

    return res.status(200).json({
      isVerified: true,
      handle: user.codeforcesHandle,
      cfData: data.result[0],
    });

  } catch (err) {
    console.error("Error fetching CF status:", err.message);
    return res.status(500).json({ message: "Unable to fetch Codeforces status" });
  }
};

export const getImportantQuestions = async (req, res) => {
  try {
    const user = await CFUser.findOne({ userId: req.user._id });
    if (!user || !user.isVerified) return res.status(403).json({ message: "Not verified" });

    res.status(200).json({ importantQuestions: user.importantQuestions });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Failed to get questions" });
  }
};

export const addImportantQuestion = async (req, res) => {
  const { question } = req.body;
  try {
    const user = await CFUser.findOne({ userId: req.user._id });
    if (!user || !user.isVerified) return res.status(403).json({ message: "Not verified" });

    if (!user.importantQuestions.includes(question)) {
      user.importantQuestions.push(question);
      await user.save();
    }

    res.status(200).json({ message: "Added" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Failed to add question" });
  }
};
