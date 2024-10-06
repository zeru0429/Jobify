import express, { NextFunction } from "express";
import { Request, Response } from "express";
import jobController from "./job_controller.js";

const jobRouter = express.Router();

// Create a new job
jobRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  jobController.createJob(req, res, next);
});

// Get a single job by ID
jobRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  jobController.getSingleJob(req, res, next);
});
// Get all jobs
jobRouter.get("/", jobController.getAllJob);

// Update a job by ID
jobRouter.patch("/:id", (req: Request, res: Response) => {
  jobController.updateJob(req, res);
});

// Delete a job by ID
jobRouter.delete("/:id", (req: Request, res: Response) => {
  jobController.deleteJob(req, res);
});

export default jobRouter;
