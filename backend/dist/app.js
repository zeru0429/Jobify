import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config/secrete.js";
import { isAuth } from "./middlewares/auth.js";
const app = express();
// middle ware
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import appRouter from "./router/index.js";
import userController from "./api/user/user_controller.js";
//public
app.post("/login", (req, res) => {
    userController.login(req, res);
});
//api
app.use("/api", isAuth, appRouter);
app.get("/", (req, res) => {
    res.send(`Express + TypeScript Server `);
});
app.listen(PORT, () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
        console.log("Connection to MongoDB successful");
    })
        .catch((e) => {
        console.error("MongoDB connection error:", e);
    });
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
