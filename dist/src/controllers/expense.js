"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpenseById = exports.getAllExpenses = void 0;
const expense_1 = require("../types/expense");
const connection_1 = __importDefault(require("../prisma/connection"));
const calculatePagination_1 = __importDefault(require("../utils/calculatePagination"));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = expense_1.ExpenseSchema.safeParse(req.body);
        if (!expense.success)
            return res.status(405).json({ message: "Invalid Request Data" });
        const newExpense = yield connection_1.default.expense.create({
            data: Object.assign({}, expense.data),
        });
        res
            .status(200)
            .json({ message: "Expense created successfully", data: newExpense });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createExpense = createExpense;
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Expense Request" });
        const expense = yield connection_1.default.expense.findFirst({
            where: {
                id,
            },
        });
        if (!expense)
            return res.status(404).json({ message: "Expense not found" });
        res
            .status(200)
            .json({ message: "Expense found successfully", data: expense });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getExpenseById = getExpenseById;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = req.body;
        const { id } = req.params;
        if (!expense || !id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const updatedExpense = yield connection_1.default.expense.update({
            where: { id },
            data: Object.assign({}, expense),
        });
        res.status(200).json({ message: "Expense updated successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Expense Request" });
        const deleteExpense = yield connection_1.default.expense.delete({
            where: {
                id,
            },
        });
        if (!deleteExpense)
            return res.status(404).json({ message: "Expense not found" });
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteExpense = deleteExpense;
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, pageSize = 10, from, to, sort } = req.query;
        const { skip, take } = (0, calculatePagination_1.default)({
            page: Number(page),
            pageSize: Number(pageSize),
        });
        let where = {};
        if (from && to) {
            where.createdAt = {
                gte: new Date(from.toString() + "T00:00:00Z"),
                lt: new Date(to.toString() + "T23:59:59Z"),
            };
        }
        const sortBy = sort ? sort : "desc";
        const expenses = yield connection_1.default.expense.findMany({
            where,
            take,
            skip,
            orderBy: {
                createdAt: sortBy,
            },
        });
        res
            .status(200)
            .json({ message: "Expenses got successfully", data: expenses });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllExpenses = getAllExpenses;
