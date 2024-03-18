import { Response, Request } from "express";
import prisma from "../prisma/connection";
import {} from "../types/user";
import { TransactionSchema } from "../types/transaction";
import { DeleteSchema } from "../types/delete";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = TransactionSchema.safeParse(req.body);

    if (!transaction.success)
      return res.json("Invalid Transaction Request").status(405);

    const newTransaction = await prisma.transaction.create({
      data: {
        totalAmount: Number(transaction.data.totalAmount),
        paymentMethod: transaction.data.paymentMethod,
        memberId: transaction.data.memberId
          ? transaction.data.memberId
          : undefined,
      },
    });

    res.json(newTransaction).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = DeleteSchema.safeParse(req.params);
    if (!transaction.success)
      return res.json("Invalid Transaction Request").status(405);

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: transaction.data.id,
      },
    });

    res.json(deletedTransaction).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
};

export { getAllTransactions, createTransaction, deleteTransaction };
