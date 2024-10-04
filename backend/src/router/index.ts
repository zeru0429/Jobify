import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";
import { isAdminOrSuperAdmin } from "../middlewares/auth.js";
import companyRouter from "../api/company/company_router.js";
import applicationRouter from "../api/applicant/application_route.js";
import aiRouter from "../api/ai/ai_route.js";

//use imported routes
appRouter.use("/company", companyRouter);
appRouter.use("/applicant", applicationRouter);
appRouter.use("/job", jobRouter);
appRouter.use("/user", userRouter);
appRouter.use("/ai", aiRouter);
export default appRouter;
