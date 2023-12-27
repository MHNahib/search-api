import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const EXTERNAL_API = process.env.EXTERNAL_API;
