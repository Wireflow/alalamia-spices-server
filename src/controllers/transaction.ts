import { Request, Response } from "express";
import prisma from "../prisma/connection";
import { TransactionSchema } from "../types/transaction";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = TransactionSchema.safeParse(req.body);

    if (!transaction.success)
      return res.status(405).json("Invalid Transaction Request");

    const newTransaction = await prisma.transaction.create({
      data: {
        totalAmount: Number(transaction.data.totalAmount),
        paymentMethod: transaction.data.paymentMethod,
        memberId: transaction.data.memberId
          ? transaction.data.memberId
          : undefined,
      },
    });

    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Transaction Request");

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    res.status(200).json(deletedTransaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Transaction Request");

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
};
