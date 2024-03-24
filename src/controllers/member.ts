import { Request, Response } from "express";
import prisma from "../prisma/connection";
import {
  MemberAddress,
  MemberPhoneNumber,
  MemberSchema,
} from "../types/member";
import calculatePagination from "../utils/calculatePagination";

const createMember = async (req: Request, res: Response) => {
  try {
    const member = MemberSchema.safeParse(req.body);

    if (!member.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const newMember = await prisma.member.create({
      data: {
        ...member.data,
        owedBalance: Number(member.data.owedBalance),
      },
    });

    res
      .status(200)
      .json({ message: "Member created successfully", data: newMember });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { transactions } = req.query;
    if (!id) return res.status(405).json({ message: "Invalid Member Request" });

    const member = await prisma.member.findFirst({
      where: {
        id,
      },
      include: {
        transactions: transactions ? true : false,
      },
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    res
      .status(200)
      .json({ message: "Member found successfully", data: member });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateMember = async (req: Request, res: Response) => {
  try {
    const member = req.body;
    const { id } = req.params;

    if (!member || !id)
      return res.status(405).json({ message: "Invalid Request Data" });

    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        ...member,
        owedBalance: Number(member.owedBalance),
      },
    });

    res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMemberByPhone = async (req: Request, res: Response) => {
  try {
    const member = MemberPhoneNumber.safeParse(req.body);

    if (!member.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const foundUser = await prisma.member.findMany({
      where: {
        phoneNumber: {
          contains: member.data.phoneNumber,
        },
      },
    });

    if (!foundUser)
      return res.status(404).json({ message: "Member not found" });

    res
      .status(200)
      .json({ message: "Member found successfully", data: foundUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMemberByAddress = async (req: Request, res: Response) => {
  try {
    const member = MemberAddress.safeParse(req.body);

    if (!member.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const foundUser = await prisma.member.findMany({
      where: {
        address: {
          contains: member.data.address,
        },
      },
    });

    if (!foundUser)
      return res.status(404).json({ message: "Member not found" });

    res
      .status(200)
      .json({ message: "Member found successfully", data: foundUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMembers = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const { skip, take } = calculatePagination({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    const members = await prisma.member.findMany({
      take,
      skip,
    });

    res
      .status(200)
      .json({ message: "Members got successfully", data: members });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(405).json({ message: "Invalid Expense Request" });

    const deleteMember = await prisma.member.delete({
      where: {
        id,
      },
    });

    if (!deleteMember)
      return res.status(404).json({ message: "Member not found" });

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createMember,
  updateMember,
  getMemberByAddress,
  getMemberByPhone,
  getAllMembers,
  deleteMember,
  getMemberById,
};
