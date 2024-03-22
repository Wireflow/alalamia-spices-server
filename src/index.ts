import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "../config/config";
import helmet from "helmet";
import compression from "compression";

/* Routes */
import UserRoute from "./routes/user";
import AuthRoute from "./routes/auth";
import TransactionRoute from "./routes/transaction";
import MemberRoute from "./routes/member";
import ProductRoute from "./routes/product";
import SupplierRoute from "./routes/supplier";
import ExpenseRoute from "./routes/expense";

/* Middlewares */
import authMiddleware from "./middlewares/authMiddleware";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import defaultRoute from "./middlewares/defaultRoute";

dotenv.config();

const app: Express = express();

/* Web Server Configuration */
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());

/* API Routes*/
app.use("/api", UserRoute);
app.use("/api", AuthRoute);
app.use("/api", authMiddleware, TransactionRoute);
app.use("/api", authMiddleware, MemberRoute);
app.use("/api", authMiddleware, ProductRoute);
app.use("/api", authMiddleware, SupplierRoute);
app.use("/api", authMiddleware, ExpenseRoute);

/* Middleware Error Handler */
app.use("/", defaultRoute);
app.use(errorHandlingMiddleware);

/* Web Server */
const server = app.listen(config.port, () => console.log(`🚀 Server ready`));
