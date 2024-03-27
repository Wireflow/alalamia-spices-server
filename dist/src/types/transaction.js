"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.TransactionSchema = zod_1.default.object({
    totalAmount: zod_1.default.number(),
    paymentMethod: zod_1.default.enum(["CASH", "CHECK", "UNPAID"]),
    checkNumber: zod_1.default.number().optional(),
    checkAmount: zod_1.default.number().optional(),
    totalQuantityPurchased: zod_1.default.number(),
    memberId: zod_1.default.string(),
    purchasedProducts: zod_1.default
        .object({
        productId: zod_1.default.string(),
        purchaseQuantity: zod_1.default.number(),
        price: zod_1.default.number(),
        name: zod_1.default.string(),
    })
        .array(),
});
