import express from "express";
import applicationController from "./application_controller.js";
import { isAuth } from "../../middlewares/auth.js";
import { uploadMulti } from "../../middlewares/multer.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";

const applicationRouter = express.Router();

// Create a new application
applicationRouter.post(
  "/apply-job",
  uploadMulti,
  errorHandlerMethod(applicationController.createApplication)
);

// Get all applications
applicationRouter.get(
  "/job/:id",
  [isAuth],
  errorHandlerMethod(applicationController.getAllApplications)
);

// Get a single application by ID
applicationRouter.get(
  "/:id",
  [isAuth],
  errorHandlerMethod(applicationController.getSingleApplication)
);

// Update an application by ID
applicationRouter.patch(
  "/:id",
  [isAuth],
  errorHandlerMethod(applicationController.updateApplicationStatus)
);

// Delete an application by ID
applicationRouter.delete(
  "/:id",
  [isAuth],
  errorHandlerMethod(applicationController.deleteApplication)
);

export default applicationRouter;
