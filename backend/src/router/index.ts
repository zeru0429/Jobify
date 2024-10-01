import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";

//use imported routes
appRouter.use("/job", jobRouter);
appRouter.use("/user", userRouter);

export default appRouter;
