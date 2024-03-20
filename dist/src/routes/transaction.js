"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../controllers/transaction");
const router = express_1.default.Router();
router.get("/transactions", transaction_1.getAllTransactions);
router.get("/transaction/:id", transaction_1.getTransactionById);
router.post("/transaction", transaction_1.createTransaction);
router.delete("/transaction/:id", transaction_1.deleteTransaction);
exports.default = router;
