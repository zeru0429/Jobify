import express from "express";
import { isAuth } from "../../middlewares/auth.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";
import dashboardController from "./dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/company-type",
  errorHandlerMethod(dashboardController.getCompanyTypes)
);
dashboardRouter.get(
  "/job-type",
  errorHandlerMethod(dashboardController.getJobTypes)
);
dashboardRouter.get(
  "/company-job",
  errorHandlerMethod(dashboardController.getCompanyJobs)
);
dashboardRouter.get(
  "/monthly-applicants",
  errorHandlerMethod(dashboardController.getMonthlyApplicants)
);

export default dashboardRouter;
