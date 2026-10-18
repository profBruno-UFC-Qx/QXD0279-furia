import { AppDataSource } from "./database/data-source.ts";
import express, { Request, Response } from "express";
import { authRouter } from "./auth/auth.module.ts";
import { errorHandling } from "./middlewares/error-handling.midlewares.ts";
import { AuthMiddleware } from "./middlewares/auth.middleware.ts";

async function initDB() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}
initDB();

const app = express();

app.use(express.json());
app.use(authRouter);

app.use(AuthMiddleware);
app.get("/", async (req: Request, res: Response) => {
  res.json(req.user);
});

app.use(errorHandling);

app.listen(9876, () => {
  console.log(`Servidor rodando em http://localhost:${9876}`);
});
