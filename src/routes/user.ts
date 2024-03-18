import express, { Router } from "express";
import { createUser } from "../controllers/user";
const router: Router = express.Router();

router.post("/user", createUser);

export default router;
