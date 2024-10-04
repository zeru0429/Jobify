import express from "express";
import { Request, Response } from "express";
import aiController from "./ai_controller.js";

const aiRouter = express.Router();
// generateJobDescription

aiRouter.post("/generate-job-description", (req: Request, res: Response) => {
  aiController.generateJobDescription(req, res);
});

// generateSearchSuggestions

aiRouter.post("/generate-search-suggestions", (req: Request, res: Response) => {
  aiController.generateSearchSuggestions(req, res);
});

export default aiRouter;
