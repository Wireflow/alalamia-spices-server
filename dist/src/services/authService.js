"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const authService = () => {
    const encryptPassword = (password) => {
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            return bcrypt_1.default.hashSync(password, salt);
        }
        catch (error) {
            throw new Error(`Error encrypting password`);
        }
    };
    const compare = (password, hashedPassword) => {
        try {
            return bcrypt_1.default.compareSync(password, hashedPassword);
        }
        catch (error) {
            throw new Error(`Error comparing passwords`);
        }
    };
    const verifyToken = (token) => {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        }
        catch (error) {
            throw new Error(`Error verifying token`);
        }
    };
    const generateToken = (payload) => {
        try {
            const data = Object.assign({ time: Date() }, payload);
            const expiresInOneMonth = 30 * 24 * 60 * 60;
            const token = jsonwebtoken_1.default.sign(data, config_1.default.jwtSecret, {
                expiresIn: expiresInOneMonth,
            });
            return token;
        }
        catch (error) {
            throw new Error(`Error generating token`);
        }
    };
    return { encryptPassword, compare, verifyToken, generateToken };
};
exports.default = authService;
