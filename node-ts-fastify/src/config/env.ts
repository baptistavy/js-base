import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.APP_PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL!,
};