import express, { NextFunction } from "express";
import companyController from "./company_controller.js";
import { upload } from "../../middlewares/multer.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";

const companyRouter = express.Router();

// Create a new company
companyRouter.post(
  "/",
  upload.single("file"),
  errorHandlerMethod(companyController.createCompany)
);

// Get all companies
companyRouter.get("/", errorHandlerMethod(companyController.getAllCompanies));

// Get a single company by ID
companyRouter.get(
  "/:id",
  errorHandlerMethod(companyController.getSingleCompany)
);

// Update a company by ID
companyRouter.patch(
  "/:id/profile",
  errorHandlerMethod(companyController.updateCompanyProfile)
);
companyRouter.patch(
  "/:id/change-logo",
  upload.single("file"),
  errorHandlerMethod(companyController.updateCompanyLogo)
);

// Delete a company by ID
companyRouter.delete(
  "/:id",
  errorHandlerMethod(companyController.deleteCompany)
);

export default companyRouter;
