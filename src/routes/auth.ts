import express, { Router } from "express";
import { signInUser } from "../controllers/auth";
const router: Router = express.Router();

router.post("/signin", signInUser);

export default router;
