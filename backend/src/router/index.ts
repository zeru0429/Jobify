import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";
import companyRouter from "../api/company/company_router.js";
import applicationRouter from "../api/applicant/application_route.js";
import aiRouter from "../api/ai/ai_route.js";
import { isAuth, isSuperAdmin } from "../middlewares/auth.js";
import jobController from "../api/job/job_controller.js";
import dashboardRouter from "../api/dashboard/dashboardRoute.js";

// Get all jobs for public
appRouter.get("/jobs/public", jobController.getAllPublicJob);

//use imported routes
appRouter.use("/ai", isAuth, aiRouter);
appRouter.use("/user", [isAuth, isSuperAdmin], userRouter);
appRouter.use("/company", [isAuth], companyRouter);

appRouter.use("/job", [isAuth], jobRouter);
appRouter.use("/applicant", applicationRouter);
appRouter.use("/dashboard", [isAuth], dashboardRouter);

export default appRouter;
