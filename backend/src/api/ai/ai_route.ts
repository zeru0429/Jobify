import express from "express";
import { Request, Response } from "express";
import aiController from "./ai_controller.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";

const aiRouter = express.Router();
// generateJobDescription

aiRouter.post(
  "/generate-job-description",
  errorHandlerMethod(aiController.generateJobDescription)
);

// generateSearchSuggestions

aiRouter.post(
  "/generate-search-suggestions",
  errorHandlerMethod(aiController.generateSearchSuggestions)
);

export default aiRouter;
