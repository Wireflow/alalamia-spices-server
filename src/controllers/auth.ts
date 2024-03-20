import { Request, Response } from "express";
import { UserSchema } from "../types/user";
import prisma from "../prisma/connection";
import authServiceImpl from "../services/authService";

const authService = authServiceImpl();

const signInUser = async (req: Request, res: Response) => {
  try {
    const user = UserSchema.safeParse(req.body);
    if (!user.success)
      return res.json({ message: "Invalid Request Data" }).status(405);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.data.email,
      },
    });

    if (!existingUser)
      return res.json({ message: "User does not exist" }).status(401);

    const isPasswordMatch = authService.compare(
      user.data.password,
      existingUser.password
    );

    if (!isPasswordMatch)
      return res.json({ message: "Unauthorized Request" }).status(401);

    const token = authService.generateToken({ id: existingUser.id });

    res.status(200).json({
      token,
      auth: true,
      session: {
        email: existingUser.email,
        id: existingUser.id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signInUser };
