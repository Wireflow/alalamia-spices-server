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
exports.getTransactionById = exports.getAllTransactions = exports.deleteTransaction = exports.createTransaction = void 0;
const connection_1 = __importDefault(require("../prisma/connection"));
const transaction_1 = require("../types/transaction");
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.query;
        const transactions = yield connection_1.default.transaction.findMany({
            include: {
                purchasedProducts: products ? true : false,
            },
        });
        res
            .status(200)
            .json({ message: "Transactions got successfully", data: transactions });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = transaction_1.TransactionSchema.safeParse(req.body);
        if (!transaction.success)
            return res.status(405).json({ message: "Invalid Transaction Request" });
        const newTransaction = yield connection_1.default.transaction.create({
            data: Object.assign(Object.assign({}, transaction.data), { purchasedProducts: {
                    createMany: {
                        data: transaction.data.purchasedProducts,
                    },
                } }),
        });
        if (!newTransaction)
            return res.status(500).json({ message: "Failed to create transaction" });
        const purchasedProducts = transaction.data.purchasedProducts;
        for (const purchasedProduct of purchasedProducts) {
            yield connection_1.default.product.updateMany({
                where: {
                    id: purchasedProduct.productId,
                },
                data: {
                    quantity: {
                        decrement: purchasedProduct.purchaseQuantity,
                    },
                },
            });
        }
        res.status(200).json({
            message: "Transaction completed successfully",
            data: newTransaction,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createTransaction = createTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Transaction Request" });
        const deletedTransaction = yield connection_1.default.transaction.delete({
            where: {
                id,
            },
        });
        if (!deleteTransaction)
            return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json({ message: "Deleted transaction successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteTransaction = deleteTransaction;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { products } = req.query;
        if (!id)
            return res.status(405).json({ message: "Invalid Transaction Request" });
        const transaction = yield connection_1.default.transaction.findFirst({
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
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getTransactionById = getTransactionById;
