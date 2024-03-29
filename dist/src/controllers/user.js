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
exports.createUser = void 0;
const connection_1 = __importDefault(require("../prisma/connection"));
const user_1 = require("../types/user");
const authService_1 = __importDefault(require("../services/authService"));
const authService = (0, authService_1.default)();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield connection_1.default.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_1.UserSchema.safeParse(req.body);
        if (!user.success)
            return res.status(405).json({ message: "Invalid Request Data" });
        const hashedPassword = authService.encryptPassword(user.data.password);
        const newUser = yield connection_1.default.user.create({
            data: {
                email: user.data.email,
                password: hashedPassword,
            },
        });
        res
            .status(200)
            .json({ message: "User created successfully", data: newUser });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createUser = createUser;
