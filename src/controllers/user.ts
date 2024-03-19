import { Response, Request } from "express";
import prisma from "../prisma/connection";
import { UserSchema } from "../types/user";
import authServiceImpl from "../services/authService";

const authService = authServiceImpl();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = UserSchema.safeParse(req.body);
    if (!user.success) return res.status(405).json("Invalid Request Data");

    const hashedPassword = authService.encryptPassword(user.data.password);

    const newUser = await prisma.user.create({
      data: {
        email: user.data.email,
        password: hashedPassword,
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createUser };
