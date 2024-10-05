import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { MONGO_URI, PORT } from "./config/secrete.js";
import { isAuth } from "./middlewares/auth.js";
const app: Express = express();

// middle ware
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
import appRouter from "./router/index.js";
import userController from "./api/user/user_controller.js";
//public
app.post("/login", (req: Request, res: Response) => {
  userController.login(req, res);
});
//api
app.use("/api", appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server `);
});

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URI!)
    .then(() => {
      console.log("Connection to MongoDB successful");
    })
    .catch((e) => {
      console.error("MongoDB connection error:", e);
    });
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
