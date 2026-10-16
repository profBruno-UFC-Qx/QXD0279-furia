import "reflect-metadata";
import "dotenv/config";
import path from "path";

import { DataSource } from "typeorm";

const srcPath = path.resolve(__dirname, "..");

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [srcPath + "/entities/*.{ts,js}"],
  migrations: [srcPath + "/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false,
});
