import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/user";
import AuthRoute from "./routes/auth";
import TransactionRoute from "./routes/transaction";

const app: Express = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", UserRoute);
app.use("/api", AuthRoute);
app.use("/api", TransactionRoute);

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
