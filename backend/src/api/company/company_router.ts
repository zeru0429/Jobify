import express, { NextFunction } from "express";
import { Request, Response } from "express";
import companyController from "./company_controller.js";
import { upload } from "../../config/multer.js";
const companyRouter = express.Router();

// Create a new company
companyRouter.post(
  "/",
  upload.single("file"),
  (req: Request, res: Response) => {
    companyController.createCompany(req, res);
  }
);

// Get all companies
companyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  companyController.getAllCompanies(req, res, next);
});

// Get a single company by ID
companyRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  companyController.getSingleCompany(req, res, next);
});

// Update a company by ID
companyRouter.patch("/:id/profile", (req: Request, res: Response) => {
  companyController.updateCompanyProfile(req, res);
});
companyRouter.patch(
  "/:id/change-logo",
  upload.single("file"),
  (req: Request, res: Response) => {
    companyController.updateCompanyLogo(req, res);
  }
);

// Delete a company by ID
companyRouter.delete("/:id", (req: Request, res: Response) => {
  companyController.deleteCompany;
});

export default companyRouter;
