"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_1 = require("../controllers/member");
const router = express_1.default.Router();
router.post("/member", member_1.createMember);
router.post("/member/get-by-address", member_1.getMemberByAddress);
router.post("/member/get-by-phone", member_1.getMemberByPhone);
router.get("/members", member_1.getAllMembers);
router.get("/member/:id", member_1.getMemberById);
router.put("/member/:id", member_1.updateMember);
router.delete("/member/:id", member_1.deleteMember);
exports.default = router;
