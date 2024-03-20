"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberAddress = exports.MemberPhoneNumber = exports.MemberSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.MemberSchema = zod_1.default.object({
    name: zod_1.default.string(),
    address: zod_1.default.string(),
    city: zod_1.default.string(),
    state: zod_1.default.string(),
    zipCode: zod_1.default.string(),
    phoneNumber: zod_1.default.string(),
    owedBalance: zod_1.default.number().optional(),
});
exports.MemberPhoneNumber = zod_1.default.object({
    phoneNumber: zod_1.default.string(),
});
exports.MemberAddress = zod_1.default.object({
    address: zod_1.default.string(),
});
