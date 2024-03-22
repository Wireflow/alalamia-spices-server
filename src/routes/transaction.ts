import express, { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controllers/transaction";
const router: Router = express.Router();

router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getTransactionById);
router.post("/transactions", createTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;
