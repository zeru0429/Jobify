import dotenv, { configDotenv } from "dotenv";
configDotenv();
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const BASE_URL = process.env.BASE_URL;
