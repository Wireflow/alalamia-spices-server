import express, { Router } from "express";
import { signInUser } from "../controllers/auth";
const router: Router = express.Router();

router.post("/auth/login", signInUser);

export default router;
