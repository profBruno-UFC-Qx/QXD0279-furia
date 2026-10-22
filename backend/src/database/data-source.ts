import "dotenv/config";

import prisma from "../lib/prisma.ts";

export const AppDataSource = prisma;

export default prisma;
