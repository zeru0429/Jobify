import express from "express";
import applicationController from "./application_controller.js";
const applicationRouter = express.Router();
// Create a new application
applicationRouter.post("/", (req, res) => {
    applicationController.createApplication;
});
// Get all applications
applicationRouter.get("/", applicationController.getAllApplications);
// Get a single application by ID
applicationRouter.get("/:id", (req, res) => {
    applicationController.getSingleApplication;
});
// Update an application by ID
applicationRouter.put("/:id", (req, res) => {
    applicationController.updateApplication;
});
// Delete an application by ID
applicationRouter.delete("/:id", (req, res) => {
    applicationController.deleteApplication;
});
export default applicationRouter;
