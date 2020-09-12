import dotenv from "dotenv";
dotenv.config();

export const dbName = process.env.DB_NAME || "";
export const dbUsername = process.env.DB_USERNAME || "";
export const dbHost = process.env.DB_HOST || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const connectionString = process.env.CONNECTION_STRING;
