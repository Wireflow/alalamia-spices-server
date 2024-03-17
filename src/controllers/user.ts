import { Response, Request } from "express";
import prisma from "../prisma/connection";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};
