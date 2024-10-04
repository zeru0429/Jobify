import express from "express";
import companyController from "./company_controller.js";
import uploadOriginal from "../../config/multer.js";
const companyRouter = express.Router();
const uploadDestination = "dist/uploads/company-logo";
// Create a new company
companyRouter.post("/", uploadOriginal(uploadDestination), (req, res) => {
    companyController.createCompany(req, res);
});
// Get all companies
companyRouter.get("/", companyController.getAllCompanies);
// Get a single company by ID
companyRouter.get("/:id", (req, res) => {
    companyController.getSingleCompany;
});
// Update a company by ID
companyRouter.put("/:id", (req, res) => {
    companyController.updateCompany;
});
// Delete a company by ID
companyRouter.delete("/:id", (req, res) => {
    companyController.deleteCompany;
});
export default companyRouter;
