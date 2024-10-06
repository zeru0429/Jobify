import express, { NextFunction } from "express";
import { Request, Response } from "express";
import applicationController from "./application_controller.js";
import { isAuth } from "../../middlewares/auth.js";

const applicationRouter = express.Router();

// Create a new application
applicationRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    applicationController.createApplication(req, res, next);
  }
);

// Get all applications
applicationRouter.get("/", applicationController.getAllApplications);

// Get a single application by ID
applicationRouter.get("/:id", (req: Request, res: Response) => {
  applicationController.getSingleApplication;
});

// Update an application by ID
applicationRouter.put("/:id", (req: Request, res: Response) => {
  applicationController.updateApplication;
});

// Delete an application by ID
applicationRouter.delete("/:id", (req: Request, res: Response) => {
  applicationController.deleteApplication;
});

export default applicationRouter;
