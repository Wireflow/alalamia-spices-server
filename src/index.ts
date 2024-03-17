import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
