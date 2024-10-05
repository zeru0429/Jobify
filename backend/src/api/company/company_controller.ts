import mongoose from "mongoose";
import User from "../user/user_module.js";
import Company from "./company_module.js";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../../config/multer.js";
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
      // check if the file path exist
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Logo file is required.",
        });
      }

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
      // format image
      const file = formatImage(req.file);
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Invalid image file.",
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
      // Upload the logo to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(file);
      const company = new Company({ name, admin });
      company.avatar = cloudinaryResponse.secure_url;
      company.avatarPublicId = cloudinaryResponse.public_id;
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
      const { name } = req.body;

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
      company.updatedAt = new Date();

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
