import express from "express";
import { Request, Response } from "express";
import jobController from "./job_controller.js";

const jobRouter = express.Router();

// Create a new job
jobRouter.post("/", (req: Request, res: Response) => {
  jobController.createJob;
});

// Get all jobs
jobRouter.get("/", jobController.getAllJob);

// Get a single job by ID
jobRouter.get("/:id", (req: Request, res: Response) => {
  jobController.getSingleJob;
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
