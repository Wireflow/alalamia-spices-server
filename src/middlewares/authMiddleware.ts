import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const auth = authService();

    const decoded = auth.verifyToken(token);

    if (!decoded) return res.status(401).json({ error: "Unauthorized" });

    // req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error authenticating user or bad token!");
    res.status(500).json({ error: "Internal Server Error Finding User" });
  }
};

export default authMiddleware;
