import "reflect-metadata";
import "dotenv/config";
import path from "path";

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ["./src/entities/*.{ts,js}"],
  migrations: ["./src/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false,
});
// srcPath + "/entities/*.{ts,js}"
