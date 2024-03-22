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

router.post("/members", createMember);
router.post("/members/get-by-address", getMemberByAddress);
router.post("/members/get-by-phone", getMemberByPhone);
router.get("/members", getAllMembers);
router.get("/members/:id", getMemberById);
router.put("/members/:id", updateMember);
router.delete("/members/:id", deleteMember);

export default router;
