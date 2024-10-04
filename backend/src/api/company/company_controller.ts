import mongoose from "mongoose";
import User from "../user/user_module.js";
import Company from "./company_module.js"; // Adjust the path as needed
import { Request, Response } from "express";
import { BASE_URL } from "../../config/secrete.js";

const companyController = {
  // Create a new company
  createCompany: async (req: Request, res: Response) => {
    try {
      const { name, admin } = req.body;

      // Check if all required fields are provided
      if (!name || !admin) {
        return res.status(400).json({
          success: false,
          message: "Name and admin are required fields.",
        });
      }
      console.log(admin);

      // Check if the admin ID is valid
      if (!mongoose.Types.ObjectId.isValid(admin)) {
        return res.status(400).json({
          success: false,
          message: "Invalid admin ID.",
        });
      }
      //check if the name exist before
      const companyExist = await Company.findOne({ name });
      if (companyExist) {
        return res.status(400).json({
          success: false,
          message: "Company already exists.",
        });
      }
      // check if the file path exist
      if (!req.filePath) {
        return res.status(400).json({
          success: false,
          message: "Logo file is required.",
        });
      }
      var logoPath = req.filePath; // Get the path of the uploaded file
      // Check if the file was uploaded
      if (!logoPath) {
        return res.status(400).json({
          success: false,
          message: "Logo file is required.",
        });
      }

      //check if the admin exist
      const user = await User.findById(admin);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Admin not found.",
        });
      }

      // Create and save the company, using the logo path
      const company = new Company({ name, logo: logoPath, admin });
      await company.save();

      return res.status(201).json({
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
