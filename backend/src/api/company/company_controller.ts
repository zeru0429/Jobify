import Company from "./company_module.js"; // Adjust the path as needed
import { Request, Response } from "express";

const companyController = {
  // Create a new company
  createCompany: async (req: Request, res: Response) => {
    try {
      const { name, logo, admin } = req.body;

      // Check if all required fields are provided
      if (!name || !admin) {
        return res.status(400).json({
          success: false,
          message: "Name and admin are required fields.",
        });
      }

      // Create and save the company
      const company = new Company({ name, logo, admin });
      await company.save();

      res.status(201).json({
        success: true,
        message: "Company created successfully.",
        data: company,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the company.",
      });
    }
  },

  // Get all companies
  getAllCompanies: async (req: Request, res: Response) => {
    try {
      const companies = await Company.find();
      res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching companies.",
      });
    }
  },

  // Get a single company by ID
  getSingleCompany: async (req: Request, res: Response) => {
    try {
      const company = await Company.findById(req.params.id);

      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }

      res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the company.",
      });
    }
  },

  // Update a company by ID
  updateCompany: async (req: Request, res: Response) => {
    try {
      const { name, logo } = req.body;

      // Check if company exists
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }

      // Update company fields
      company.name = name !== undefined ? name : company.name;
      company.logo = logo !== undefined ? logo : company.logo;
      company.updatedAt = new Date(); // Create a new Date object

      await company.save();

      res.status(200).json({
        success: true,
        message: "Company updated successfully.",
        data: company,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the company.",
      });
    }
  },

  // Delete a company by ID
  deleteCompany: async (req: Request, res: Response) => {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);

      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Company deleted successfully.",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the company.",
      });
    }
  },
};

export default companyController;
