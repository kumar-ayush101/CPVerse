import express from "express";
import {
  initiateCFHandleVerification,
  verifyCFHandleSubmission,
  getCFUserStatus,
  addImportantQuestion,
  getImportantQuestions,
} from "../controllers/cfUserController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/initiate", auth, initiateCFHandleVerification);


router.post("/verify", auth, verifyCFHandleSubmission);
router.get('/status', auth, getCFUserStatus);
router.get("/important-questions", auth, getImportantQuestions);
router.post("/important-questions", auth, addImportantQuestion);


export default router;
