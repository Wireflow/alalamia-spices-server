"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProductSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    price: zod_1.default.number(),
    boxQuantity: zod_1.default.number().optional(),
    quantity: zod_1.default.number().optional(),
    grams: zod_1.default.number().optional(),
    sku: zod_1.default.string().optional(),
    supplierId: zod_1.default.string().optional(),
});
