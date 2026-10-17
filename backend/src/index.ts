import { AppDataSource } from "./database/data-source.ts";
import express, { Request, Response } from "express";
import { authRouter } from "./auth/auth.module.ts";
import { errorHandling } from "./middlewares/error-handling.midlewares.ts";
const app = express();

app.use(express.json());
app.use(authRouter);

async function initDB() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}
initDB();

app.get("/", async (req: Request, res: Response) => {
  res.end("hello");
});

app.listen(9876, () => {
  console.log(`Servidor rodando em http://localhost:${9876}`);
});

app.use(errorHandling);
