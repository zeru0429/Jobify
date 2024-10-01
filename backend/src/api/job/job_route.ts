import express from "express";
import jobController from "./job_controller.js";
const jobRouter = express.Router();
//
jobRouter.post("/job", jobController.createJob);
jobRouter.get("/job", jobController.getAllJob);
jobRouter.get("/job/:id", jobController.getSingleJob);
export default jobRouter;
