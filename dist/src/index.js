"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config/config"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
/* Routes */
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const member_1 = __importDefault(require("./routes/member"));
const product_1 = __importDefault(require("./routes/product"));
const supplier_1 = __importDefault(require("./routes/supplier"));
const expense_1 = __importDefault(require("./routes/expense"));
/* Middlewares */
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const errorHandlingMiddleware_1 = __importDefault(require("./middlewares/errorHandlingMiddleware"));
const defaultRoute_1 = __importDefault(require("./middlewares/defaultRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/* Web Server Configuration */
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
/* API Routes*/
app.use("/api", user_1.default);
app.use("/api", auth_1.default);
app.use("/api", authMiddleware_1.default, transaction_1.default);
app.use("/api", authMiddleware_1.default, member_1.default);
app.use("/api", authMiddleware_1.default, product_1.default);
app.use("/api", authMiddleware_1.default, supplier_1.default);
app.use("/api", authMiddleware_1.default, expense_1.default);
/* Middleware Error Handler */
app.use("/", defaultRoute_1.default);
app.use(errorHandlingMiddleware_1.default);
/* Web Server */
const server = app.listen(config_1.default.port, () => console.log(`🚀 Server ready`));
