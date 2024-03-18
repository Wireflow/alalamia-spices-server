import { Response, Request } from "express";
import prisma from "../prisma/connection";
import { UserSchema } from "../types/user";
import authServiceImpl from "../services/authService";

const authService = authServiceImpl();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = UserSchema.safeParse(req.body);
    if (!user.success) return res.json("Invalid Request Data").status(405);

    const hashedPassword = authService.encryptPassword(user.data.password);

    const newUser = await prisma.user.create({
      data: {
        email: user.data.email,
        password: hashedPassword,
      },
    });

    res.json(newUser).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};

export { createUser };
