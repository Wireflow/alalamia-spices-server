import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }

    const auth = authService();

    const decoded = auth.verifyToken(token);

    if (!decoded)
      return res.status(401).json({ error: "Unauthorized Request" });

    // req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ error: "Unauthorized Request" });
  }
};

export default authMiddleware;
