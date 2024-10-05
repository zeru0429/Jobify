import express from "express";
import { Request, Response } from "express";
import applicationController from "./application_controller.js";
import { isAuth, isAdmin } from "../../middlewares/auth.js";

const applicationRouter = express.Router();

// Create a new application
applicationRouter.post("/", (req: Request, res: Response) => {
  applicationController.createApplication;
});

// Get all applications
applicationRouter.get(
  "/",
  [isAuth, isAdmin],
  applicationController.getAllApplications
);

// Get a single application by ID
applicationRouter.get(
  "/:id",
  [isAuth, isAdmin],
  (req: Request, res: Response) => {
    applicationController.getSingleApplication;
  }
);

// Update an application by ID
applicationRouter.put(
  "/:id",
  [isAuth, isAdmin],
  (req: Request, res: Response) => {
    applicationController.updateApplication;
  }
);

// Delete an application by ID
applicationRouter.delete(
  "/:id",
  [isAuth, isAdmin],
  (req: Request, res: Response) => {
    applicationController.deleteApplication;
  }
);

export default applicationRouter;
