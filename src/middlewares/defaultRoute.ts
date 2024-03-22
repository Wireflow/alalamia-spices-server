import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const defaultRoute = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Authorized Access Only" });
};

export default defaultRoute;
