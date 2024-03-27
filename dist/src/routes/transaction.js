"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../controllers/transaction");
const router = express_1.default.Router();
router.get("/transactions", transaction_1.getAllTransactions);
router.get("/transactions/count", transaction_1.getTransactionCount);
router.get("/transactions/:id", transaction_1.getTransactionById);
router.post("/transactions", transaction_1.createTransaction);
router.delete("/transactions/:id", transaction_1.deleteTransaction);
exports.default = router;
