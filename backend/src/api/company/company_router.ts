import express from "express";
import { Request, Response } from "express";
import companyController from "./company_controller.js";
const companyRouter = express.Router();

// Create a new company
companyRouter.post("/", (req: Request, res: Response) => {
  companyController.createCompany;
});

// Get all companies
companyRouter.get("/", companyController.getAllCompanies);

// Get a single company by ID
companyRouter.get("/:id", (req: Request, res: Response) => {
  companyController.getSingleCompany;
});

// Update a company by ID
companyRouter.put("/:id", (req: Request, res: Response) => {
  companyController.updateCompany;
});

// Delete a company by ID
companyRouter.delete("/:id", (req: Request, res: Response) => {
  companyController.deleteCompany;
});

export default companyRouter;
