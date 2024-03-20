"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.TransactionSchema = zod_1.default.object({
    totalAmount: zod_1.default.number(),
    paymentMethod: zod_1.default.enum(["CASH", "CARD", "CHECK"]),
    memberId: zod_1.default.string(),
    products: zod_1.default
        .object({
        id: zod_1.default.string(),
    })
        .array(),
});
