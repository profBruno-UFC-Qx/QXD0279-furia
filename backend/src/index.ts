import express, { Request, Response } from "express";
import { authRouter } from "./auth/auth.module.ts";
import { errorHandling } from "./middlewares/error-handling.midlewares.ts";
import { diciplineRouter } from "./dicipline/dicipline.module.ts";
import { teacherRouter } from "./teacher/teacher.module.ts";
import { studentRouter } from "./student/student.module.ts";
import { avaliacaoRouter } from "./avaliacao/avaliacao.module.ts";
import { AutorizationMiddleware } from "./middlewares/autorization.middleware.ts";
import { AuthMiddleware } from "./auth/middlewares/auth.middleware.ts";
import cors from "cors";

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
app.use(AuthMiddleware);
app.use(diciplineRouter);
app.use(studentRouter);
app.use(teacherRouter);
app.use(avaliacaoRouter);

app.get(
  "/",
  AutorizationMiddleware(["student"]),
  async (req: Request, res: Response) => {
    res.json(req.user);
  },
);

app.use(errorHandling);

app.listen(9876, () => {
  console.log(`Servidor rodando em http://localhost:${9876}`);
});
