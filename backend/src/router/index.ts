import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";
import { isAdminOrSuperAdmin } from "../middlewares/auth.js";

//use imported routes
appRouter.use("/job", jobRouter);
appRouter.use("/user", isAdminOrSuperAdmin, userRouter);

export default appRouter;
