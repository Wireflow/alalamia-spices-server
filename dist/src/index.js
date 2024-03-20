"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config/config"));
/* Routes */
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const member_1 = __importDefault(require("./routes/member"));
const product_1 = __importDefault(require("./routes/product"));
const supplier_1 = __importDefault(require("./routes/supplier"));
/* Middlewares */
const authMiddleware_1 = __importDefault(
  require("./middlewares/authMiddleware")
);
const errorHandlingMiddleware_1 = __importDefault(
  require("./middlewares/errorHandlingMiddleware")
);
const app = (0, express_1.default)();
/* Web Server Configuration */
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
/* API Routes*/
app.use("/api", user_1.default);
app.use("/api", auth_1.default);
app.use("/api", authMiddleware_1.default, transaction_1.default);
app.use("/api", authMiddleware_1.default, member_1.default);
app.use("/api", authMiddleware_1.default, product_1.default);
app.use("/api", authMiddleware_1.default, supplier_1.default);
/* Middleware Error Handler */
app.use(errorHandlingMiddleware_1.default);
/* Web Server */
const server = app.listen(config_1.default.port, () =>
  console.log(`🚀 Server ready`)
);
