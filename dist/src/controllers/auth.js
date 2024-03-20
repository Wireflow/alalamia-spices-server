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
exports.signInUser = void 0;
const user_1 = require("../types/user");
const connection_1 = __importDefault(require("../prisma/connection"));
const authService_1 = __importDefault(require("../services/authService"));
const authService = (0, authService_1.default)();
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_1.UserSchema.safeParse(req.body);
        if (!user.success)
            return res.json({ message: "Invalid Request Data" }).status(405);
        const existingUser = yield connection_1.default.user.findFirst({
            where: {
                email: user.data.email,
            },
        });
        if (!existingUser)
            return res.json({ message: "User does not exist" }).status(401);
        const isPasswordMatch = authService.compare(user.data.password, existingUser.password);
        if (!isPasswordMatch)
            return res.json({ message: "Unauthorized Request" }).status(401);
        const token = authService.generateToken({ id: existingUser.id });
        res.status(200).json({
            token,
            auth: true,
            session: {
                email: existingUser.email,
                id: existingUser.id,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signInUser = signInUser;
