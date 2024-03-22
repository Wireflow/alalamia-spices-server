"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_1 = require("../controllers/expense");
const router = express_1.default.Router();
router.post("/expenses", expense_1.createExpense);
router.get("/expenses", expense_1.getAllExpenses);
router.get("/expenses/:id", expense_1.getExpenseById);
router.delete("/expenses/:id", expense_1.deleteExpense);
router.put("/expenses/:id", expense_1.updateExpense);
exports.default = router;
