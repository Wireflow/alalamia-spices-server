import express, { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from "../controllers/expense";
const router: Router = express.Router();

router.post("/expenses", createExpense);
router.get("/expenses", getAllExpenses);
router.get("/expenses/:id", getExpenseById);
router.delete("/expenses/:id", deleteExpense);
router.put("/expenses/:id", updateExpense);

export default router;
