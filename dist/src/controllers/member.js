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
exports.getMemberCount = exports.getMembersTotalOwedBalance = exports.getMemberById = exports.deleteMember = exports.getAllMembers = exports.getMemberByPhone = exports.getMemberByAddress = exports.updateMember = exports.createMember = void 0;
const connection_1 = __importDefault(require("../prisma/connection"));
const member_1 = require("../types/member");
const calculatePagination_1 = __importDefault(require("../utils/calculatePagination"));
const getMemberCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield connection_1.default.member.count();
        res
            .status(200)
            .json({ message: "Member count retrieved successfully", data: count });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMemberCount = getMemberCount;
const getMembersTotalOwedBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield connection_1.default.member.aggregate({
            _sum: {
                owedBalance: true,
            },
        });
        res
            .status(200)
            .json({ message: "Member total owed balance successfully", data: count });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMembersTotalOwedBalance = getMembersTotalOwedBalance;
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = member_1.MemberSchema.safeParse(req.body);
        if (!member.success)
            return res.status(405).json({ message: "Invalid Request Data" });
        const newMember = yield connection_1.default.member.create({
            data: Object.assign(Object.assign({}, member.data), { owedBalance: Number(member.data.owedBalance) }),
        });
        res
            .status(200)
            .json({ message: "Member created successfully", data: newMember });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createMember = createMember;
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { transactions } = req.query;
        if (!id)
            return res.status(405).json({ message: "Invalid Member Request" });
        const member = yield connection_1.default.member.findFirst({
            where: {
                id,
            },
            include: {
                transactions: transactions ? true : false,
            },
        });
        if (!member)
            return res.status(404).json({ message: "Member not found" });
        res
            .status(200)
            .json({ message: "Member found successfully", data: member });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMemberById = getMemberById;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = req.body;
        const { id } = req.params;
        if (!member || !id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const updatedMember = yield connection_1.default.member.update({
            where: { id },
            data: Object.assign(Object.assign({}, member), { owedBalance: Number(member.owedBalance) }),
        });
        res.status(200).json({ message: "Member updated successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateMember = updateMember;
const getMemberByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.query;
        if (!phoneNumber)
            return res.status(405).json({ message: "Invalid Search Data" });
        const foundUser = yield connection_1.default.member.findMany({
            where: {
                phoneNumber: {
                    contains: phoneNumber,
                },
            },
        });
        if (!foundUser)
            return res.status(404).json({ message: "Member not found" });
        res
            .status(200)
            .json({ message: "Member found successfully", data: foundUser });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMemberByPhone = getMemberByPhone;
const getMemberByAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = req.query;
        if (!address)
            return res.status(405).json({ message: "Invalid Search Data" });
        const foundUser = yield connection_1.default.member.findMany({
            where: {
                address: {
                    contains: address,
                },
            },
        });
        if (!foundUser)
            return res.status(404).json({ message: "Member not found" });
        res
            .status(200)
            .json({ message: "Member found successfully", data: foundUser });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMemberByAddress = getMemberByAddress;
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, pageSize = 10, sort } = req.query;
        const { skip, take } = (0, calculatePagination_1.default)({
            page: Number(page),
            pageSize: Number(pageSize),
        });
        const sortBy = sort ? sort : "desc";
        const members = yield connection_1.default.member.findMany({
            take,
            skip,
            orderBy: {
                createdAt: sortBy,
            },
        });
        res
            .status(200)
            .json({ message: "Members got successfully", data: members });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllMembers = getAllMembers;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Expense Request" });
        const deleteMember = yield connection_1.default.member.delete({
            where: {
                id,
            },
        });
        if (!deleteMember)
            return res.status(404).json({ message: "Member not found" });
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteMember = deleteMember;
