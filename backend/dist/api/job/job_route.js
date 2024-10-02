import express from "express";
import jobController from "./job_controller.js";
const jobRouter = express.Router();
// Create a new job
jobRouter.post("/", (req, res) => {
    jobController.createJob;
});
// Get all jobs
jobRouter.get("/", jobController.getAllJob);
// Get a single job by ID
jobRouter.get("/:id", (req, res) => {
    jobController.getSingleJob;
});
// Update a job by ID
jobRouter.put("/:id", (req, res) => {
    jobController.updateJob;
});
// Delete a job by ID
jobRouter.delete("/:id", (req, res) => {
    jobController.deleteJob;
});
export default jobRouter;
