import { Request, Response } from "express";
import { ExpenseSchema } from "../types/expense";
import prisma from "../prisma/connection";
import calculatePagination from "../utils/calculatePagination";
import { Prisma } from "@prisma/client";

const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = ExpenseSchema.safeParse(req.body);

    if (!expense.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const newExpense = await prisma.expense.create({
      data: {
        ...expense.data,
      },
    });

    res
      .status(200)
      .json({ message: "Expense created successfully", data: newExpense });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(405).json({ message: "Invalid Expense Request" });

    const expense = await prisma.expense.findFirst({
      where: {
        id,
      },
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res
      .status(200)
      .json({ message: "Expense found successfully", data: expense });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const expense = req.body;
    const { id } = req.params;

    if (!expense || !id)
      return res.status(405).json({ message: "Invalid Request Data" });

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        ...expense,
      },
    });

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(405).json({ message: "Invalid Expense Request" });

    const deleteExpense = await prisma.expense.delete({
      where: {
        id,
      },
    });

    if (!deleteExpense)
      return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10, from, to } = req.query;

    const { skip, take } = calculatePagination({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    let where: Prisma.ExpenseWhereInput = {};

    if (from && to) {
      where.createdAt = {
        gte: new Date(from.toString() + "T00:00:00Z"),
        lt: new Date(to.toString() + "T23:59:59Z"),
      };
    }

    const expenses = await prisma.expense.findMany({
      where,
      take,
      skip,
    });

    res
      .status(200)
      .json({ message: "Expenses got successfully", data: expenses });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
