import { Request, Response } from "express";
import prisma from "../prisma/connection";
import { TransactionSchema } from "../types/transaction";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { products } = req.query;
    const transactions = await prisma.transaction.findMany({
      include: {
        products: products ? true : false,
      },
    });

    res
      .status(200)
      .json({ message: "Transactions got successfully", data: transactions });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = TransactionSchema.safeParse(req.body);

    if (!transaction.success)
      return res.status(405).json({ message: "Invalid Transaction Request" });

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction.data,
        products: {
          connect: [...transaction.data.products],
        },
      },
    });

    res.status(200).json({
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(405).json({ message: "Invalid Transaction Request" });

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    if (!deleteTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Deleted transaction successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { products } = req.query;
    if (!id)
      return res.status(405).json({ message: "Invalid Transaction Request" });

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
      },
      include: {
        products: products ? true : false,
      },
    });

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    res
      .status(200)
      .json({ message: "Transaction found successfully", data: transaction });
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
