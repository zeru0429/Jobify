import express, { Express, Request, Response } from "express";
import { Queue, Worker } from "bullmq";
import Redis from "ioredis";

import { v2 as cloudinary } from "cloudinary";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
  MONGO_URI,
  PORT,
} from "./config/secrete.js";
import cacheMiddleware from "./config/catch.js";
const app: Express = express();

// middle ware
const corsOptions = {
  origin: [
    "*",
    "https://jobify.huludelala.com",
    "https://jobify-zeru.netlify.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const limiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

//  Content Security Policy
const csp = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://trusted.cdn.com"],
    styleSrc: ["'self'", "https://trusted.styles.com"],
    imgSrc: ["'self'", "data:", "https://trusted.images.com"],
    connectSrc: ["'self'", "https://api.trusted.com"],
    fontSrc: ["'self'", "https://fonts.googleapis.com"],
    objectSrc: ["'none'"],
    frameSrc: ["'self'"],
    upgradeInsecureRequests: [],
  },
};
app.use(cors(corsOptions));
app.use(limiter);
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);
// app.use(
//   helmet({
//     contentSecurityPolicy: csp,
//     crossOriginEmbedderPolicy: true,
//     crossOriginResourcePolicy: { policy: "same-origin" },
//     referrerPolicy: { policy: "no-referrer" },
//     hsts: {
//       maxAge: 31536000,
//       includeSubDomains: true,
//       preload: true,
//     },
//     xssFilter: false,
//   })
// );
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
import appRouter from "./router/index.js";
import userController from "./api/user/user_controller.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

//public
app.post("/login", (req: Request, res: Response) => {
  userController.login(req, res);
});
//api
app.use("/api", cacheMiddleware, appRouter);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
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
