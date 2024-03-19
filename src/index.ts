import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import UserRoute from "./routes/user";
import AuthRoute from "./routes/auth";
import TransactionRoute from "./routes/transaction";
import MemberRoute from "./routes/member";
import ProductRoute from "./routes/product";

// Middlewares
import authMiddleware from "./middlewares/authMiddleware";

const app: Express = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", UserRoute);
app.use("/api", AuthRoute);
app.use("/api", authMiddleware, TransactionRoute);
app.use("/api", authMiddleware, MemberRoute);
app.use("/api", authMiddleware, ProductRoute);

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
