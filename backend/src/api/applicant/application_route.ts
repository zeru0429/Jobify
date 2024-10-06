import express, { NextFunction } from "express";
import { Request, Response } from "express";
import applicationController from "./application_controller.js";
import { isAuth } from "../../middlewares/auth.js";
import { uploadMulti } from "../../config/multer.js";

const applicationRouter = express.Router();

// Create a new application
applicationRouter.post(
  "/apply-job",
  uploadMulti,
  (req: Request, res: Response, next: NextFunction) => {
    applicationController.createApplication(req, res, next);
  }
);

// Get all applications
applicationRouter.get("/job/:id", [isAuth], (req: Request, res: Response) => {
  applicationController.getAllApplications(req, res);
});

// Get a single application by ID
applicationRouter.get("/:id", [isAuth], (req: Request, res: Response) => {
  applicationController.getSingleApplication(req, res);
});

// Update an application by ID
applicationRouter.patch("/:id", [isAuth], (req: Request, res: Response) => {
  applicationController.updateApplicationStatus(req, res);
});

// Delete an application by ID
applicationRouter.delete("/:id", [isAuth], (req: Request, res: Response) => {
  applicationController.deleteApplication(req, res);
});

export default applicationRouter;
