import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";
import companyRouter from "../api/company/company_router.js";
import applicationRouter from "../api/applicant/application_route.js";
import aiRouter from "../api/ai/ai_route.js";
import { isAdmin, isAuth, isSuperAdmin } from "../middlewares/auth.js";

//use imported routes
appRouter.use("/ai", isAuth, aiRouter);
appRouter.use("/user", [isAuth, isSuperAdmin], userRouter);
appRouter.use("/company", [isAuth, isAdmin], companyRouter);
appRouter.use("/job", [isAuth, isAdmin], jobRouter);
appRouter.use("/applicant", applicationRouter);

export default appRouter;
