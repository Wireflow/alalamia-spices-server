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
exports.getTransactionCount = exports.getTransactionById = exports.getAllTransactions = exports.deleteTransaction = exports.createTransaction = void 0;
const connection_1 = __importDefault(require("../prisma/connection"));
const transaction_1 = require("../types/transaction");
const calculatePagination_1 = __importDefault(require("../utils/calculatePagination"));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, page = 1, pageSize = 10, from, to, sort = "desc", } = req.query;
        const { skip, take } = (0, calculatePagination_1.default)({
            page: Number(page),
            pageSize: Number(pageSize),
        });
        let where = {};
        if (from && to) {
            where.createdAt = {
                gte: new Date(from.toString() + "T00:00:00Z"),
                lte: new Date(to.toString() + "T23:59:59Z"),
            };
        }
        const sortBy = sort ? sort : "desc";
        const transactions = yield connection_1.default.transaction.findMany({
            where,
            take,
            skip,
            include: {
                purchasedProducts: products ? true : false,
            },
            orderBy: {
                createdAt: sortBy,
            },
        });
        res
            .status(200)
            .json({ message: "Transactions got successfully", data: transactions });
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.query;
        let where = {};
        if (from && to) {
            where.createdAt = {
                gte: new Date(from.toString() + "T00:00:00Z"),
                lt: new Date(to.toString() + "T23:59:59Z"),
            };
        }
        const count = yield connection_1.default.transaction.count({
            where,
        });
        res.status(200).json({
            message: "Transaction count retrieved successfully",
            data: count,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getTransactionCount = getTransactionCount;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = transaction_1.TransactionSchema.safeParse(req.body);
        if (!transaction.success)
            return res.status(405).json({ message: "Invalid Transaction Request" });
        const purchasedProducts = transaction.data.purchasedProducts;
        const updatePromises = purchasedProducts.map((purchasedProduct) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield connection_1.default.product.findUnique({
                where: {
                    id: purchasedProduct.productId,
                },
                select: {
                    id: true,
                    boxQuantity: true,
                    name: true,
                },
            });
            const productBoxQuantity = ((product === null || product === void 0 ? void 0 : product.boxQuantity) && product.boxQuantity) || 0;
            if (!product || productBoxQuantity < purchasedProduct.purchaseQuantity) {
                throw new Error(`Not enough quantity: ${product === null || product === void 0 ? void 0 : product.name}`);
            }
            yield connection_1.default.product.updateMany({
                where: {
                    id: purchasedProduct.productId,
                },
                data: {
                    boxQuantity: {
                        decrement: purchasedProduct.purchaseQuantity,
                    },
                },
            });
        }));
        try {
            yield Promise.all(updatePromises);
        }
        catch (error) {
            return res.json({
                message: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
        const newTransaction = yield connection_1.default.transaction.create({
            data: Object.assign(Object.assign({}, transaction.data), { purchasedProducts: {
                    createMany: {
                        data: transaction.data.purchasedProducts,
                    },
                } }),
        });
        if (transaction.data.paymentMethod === "UNPAID") {
            const memberWithBalance = yield connection_1.default.member.findFirst({
                where: {
                    id: transaction.data.memberId,
                },
            });
            yield connection_1.default.member.update({
                where: {
                    id: transaction.data.memberId,
                },
                data: {
                    owedBalance: !(memberWithBalance === null || memberWithBalance === void 0 ? void 0 : memberWithBalance.owedBalance)
                        ? transaction.data.totalAmount
                        : memberWithBalance.owedBalance + transaction.data.totalAmount,
                },
            });
        }
        if (!newTransaction)
            return res.status(500).json({ message: "Failed to create transaction" });
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
        const { products, member } = req.query;
        if (!id)
            return res.status(405).json({ message: "Invalid Transaction Request" });
        const transaction = yield connection_1.default.transaction.findFirst({
            where: {
                id,
            },
            include: {
                purchasedProducts: products ? true : false,
                member: member ? true : false,
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
