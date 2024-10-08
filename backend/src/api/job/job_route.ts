import express from "express";
import jobController from "./job_controller.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";

const jobRouter = express.Router();

// Create a new job
jobRouter.post("/", errorHandlerMethod(jobController.createJob));

// Get a single job by ID
jobRouter.get("/:id", errorHandlerMethod(jobController.getSingleJob));
// Get all jobs
jobRouter.get("/", errorHandlerMethod(jobController.getAllJob));

// Update a job by ID
jobRouter.patch("/:id", errorHandlerMethod(jobController.updateJob));

// Delete a job by ID
jobRouter.delete("/:id", errorHandlerMethod(jobController.deleteJob));

export default jobRouter;
