"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized Request" });
        }
        const auth = (0, authService_1.default)();
        const decoded = auth.verifyToken(token);
        if (!decoded)
            return res.status(401).json({ error: "Unauthorized Request" });
        // req.body.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Unauthorized Request" });
    }
};
exports.default = authMiddleware;
