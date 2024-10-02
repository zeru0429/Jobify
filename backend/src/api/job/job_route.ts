import express from "express";
import jobController from "./job_controller.js";
const jobRouter = express.Router();
//
jobRouter.post("/", jobController.createJob);
jobRouter.get("/", jobController.getAllJob);
jobRouter.get("/:id", jobController.getSingleJob);
export default jobRouter;
