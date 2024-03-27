import { Request, Response } from "express";
import prisma from "../prisma/connection";
import { TransactionSchema } from "../types/transaction";
import { date } from "zod";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { products } = req.query;
    const transactions = await prisma.transaction.findMany({
      include: {
        purchasedProducts: products ? true : false,
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

    const purchasedProducts = transaction.data.purchasedProducts;
    const updatePromises = purchasedProducts.map(async (purchasedProduct) => {
      const product = await prisma.product.findUnique({
        where: {
          id: purchasedProduct.productId,
        },
        select: {
          id: true,
          boxQuantity: true,
          name: true,
        },
      });

      const productBoxQuantity =
        (product?.boxQuantity && product.boxQuantity) || 0;

      if (!product || productBoxQuantity < purchasedProduct.purchaseQuantity) {
        throw new Error(`Not enough quantity: ${product?.name}`);
      }

      await prisma.product.updateMany({
        where: {
          id: purchasedProduct.productId,
        },
        data: {
          boxQuantity: {
            decrement: purchasedProduct.purchaseQuantity,
          },
        },
      });
    });

    try {
      await Promise.all(updatePromises);
    } catch (error) {
      return res.json({
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
    
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction.data,
        purchasedProducts: {
          createMany: {
            data: transaction.data.purchasedProducts,
          },
        },
      },
    });

    //UNPAID function

    if (transaction.data.paymentMethod === 'UNPAID') {
    
      const memberWithBalance = await prisma.member.findFirst({
        where: {
          id: transaction.data.memberId
        }
      })

      await prisma.member.update({
        where: {
          id: transaction.data.memberId
        },
        data: {
          owedBalance: !memberWithBalance?.owedBalance ? transaction.data.totalAmount : memberWithBalance.owedBalance + transaction.data.totalAmount 
        }
      });
    }
    

    if (!newTransaction)
      return res.status(500).json({ message: "Failed to create transaction" });

    res.status(200).json({
      message: "Transaction completed successfully",
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
        purchasedProducts: products ? true : false,
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
