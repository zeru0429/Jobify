import express from "express";
const appRouter = express.Router();
import jobRouter from "../api/job/job_route.js";
import userRouter from "../api/user/user_route.js";
import companyRouter from "../api/company/company_router.js";
import applicationRouter from "../api/applicant/application_route.js";
//use imported routes
appRouter.use("/company", companyRouter);
appRouter.use("/applicant", applicationRouter);
appRouter.use("/job", jobRouter);
appRouter.use("/user", userRouter);
export default appRouter;
