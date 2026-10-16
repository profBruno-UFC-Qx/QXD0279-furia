import { AppDataSource } from "./database/data-source";
import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

async function initDB() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}

initDB();

app.get("/", (req: Request, res: Response) => {
  res.json({
    connected: AppDataSource.isInitialized,
    entities: AppDataSource.entityMetadatas.map((entity) => ({
      name: entity.name,
      tableName: entity.tableName,
    })),
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
