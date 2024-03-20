import express, { Router } from "express";
import {
  createMember,
  updateMember,
  getMemberByAddress,
  getMemberByPhone,
  getAllMembers,
  deleteMember,
  getMemberById,
} from "../controllers/member";
const router: Router = express.Router();

router.post("/member", createMember);
router.post("/member/get-by-address", getMemberByAddress);
router.post("/member/get-by-phone", getMemberByPhone);
router.get("/members", getAllMembers);
router.get("/member/:id", getMemberById);
router.put("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);

export default router;
