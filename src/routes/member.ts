import express, { Router } from "express";
import {
  createMember,
  updateMember,
  getMemberByAddress,
  getMemberByPhone,
  getAllMembers,
  deleteMember,
} from "../controllers/member";
const router: Router = express.Router();

router.post("/member", createMember);
router.get("/member/get-by-address", getMemberByAddress);
router.get("/member/get-by-phone", getMemberByPhone);
router.get("/members", getAllMembers);
router.put("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);

export default router;
