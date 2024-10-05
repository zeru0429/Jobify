import express, { NextFunction } from "express";
import { Request, Response } from "express";
import jobController from "./job_controller.js";

const jobRouter = express.Router();

// Create a new job
// Create a new job
jobRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  jobController.createJob(req, res, next); // Call the method with req, res, next
});

// Get all jobs
jobRouter.get("/", jobController.getAllJob);

// Get a single job by ID
jobRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  jobController.getSingleJob(req, res, next); // Call the method with req, res, next
});

// Update a job by ID
jobRouter.put("/:id", (req: Request, res: Response) => {
  jobController.updateJob;
});

// Delete a job by ID
jobRouter.delete("/:id", (req: Request, res: Response) => {
  jobController.deleteJob;
});

export default jobRouter;
