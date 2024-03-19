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

    if (!member.success) return res.status(405).json("Invalid Request Data");

    const newMember = await prisma.member.create({
      data: {
        ...member.data,
        owedBalance: Number(member.data.owedBalance),
      },
    });

    res.status(200).json(newMember);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateMember = async (req: Request, res: Response) => {
  try {
    const member = req.body;
    const { id } = req.params;

    if (!member || !id) return res.json("Invalid Request Data").status(405);

    const newMember = await prisma.member.update({
      where: { id },
      data: {
        ...member,
        owedBalance: Number(member.owedBalance),
      },
    });

    res.status(200).json(newMember);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMemberByPhone = async (req: Request, res: Response) => {
  try {
    const member = MemberPhoneNumber.safeParse(req.body);

    if (!member.success) return res.json("Invalid Request Data").status(405);

    const foundUser = await prisma.member.findMany({
      where: {
        phoneNumber: {
          contains: member.data.phoneNumber,
        },
      },
    });

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMemberByAddress = async (req: Request, res: Response) => {
  try {
    const member = MemberAddress.safeParse(req.body);

    if (!member.success) return res.json("Invalid Request Data").status(405);

    const foundUser = await prisma.member.findMany({
      where: {
        address: {
          contains: member.data.address,
        },
      },
    });

    res.status(200).json(foundUser);
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
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Transaction Request");

    const deleteMember = await prisma.member.delete({
      where: {
        id,
      },
    });

    res.status(200).json(deleteMember);
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
};
