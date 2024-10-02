import express from "express";
import companyController from "./company_controller.js";
const companyRouter = express.Router();
// Create a new company
companyRouter.post("/", (req, res) => {
    companyController.createCompany;
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
