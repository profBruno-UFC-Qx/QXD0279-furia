import { AppDataSource } from "./database/data-source.ts";
import express, { Request, Response } from "express";
import { authRouter } from "./auth/auth.module.ts";
import { errorHandling } from "./middlewares/error-handling.midlewares.ts";
import { AuthMiddleware } from "./middlewares/auth.middleware.ts";
import cors from "cors";

async function initDB() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}
initDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.json(req.user);
});

app.use(AuthMiddleware);

app.use(errorHandling);

app.listen(9876, () => {
  console.log(`Servidor rodando em http://localhost:${9876}`);
});
