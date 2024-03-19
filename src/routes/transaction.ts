import express, { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controllers/transaction";
const router: Router = express.Router();

router.get("/transactions", getAllTransactions);
router.get("/transaction/:id", getTransactionById);
router.post("/transaction", createTransaction);
router.delete("/transaction/:id", deleteTransaction);

export default router;
