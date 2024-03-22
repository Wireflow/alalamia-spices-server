"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ExpenseSchema = zod_1.default.object({
    name: zod_1.default.string(),
    amount: zod_1.default.number(),
});
