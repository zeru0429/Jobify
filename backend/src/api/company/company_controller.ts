import mongoose from "mongoose";
import User from "../user/user_module.js";
import Company from "./company_module.js";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../../config/multer.js";
import companyValidator from "./company_validator.js";

const companyController = {
  // Create a new company
  createCompany: async (req: Request, res: Response) => {
    // validator
    companyValidator.create.parse(req.body);
    req.body.admin = req.user?._id;
    const { name, type, companyType, address, admin } = req.body;
    // Check if all required fields are provided

    // Check if the file path exists
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

    // Check if the name exists before
    const companyExist = await Company.findOne({ name });
    if (companyExist) {
      return res.status(400).json({
        success: false,
        message: "Company already exists.",
      });
    }

    // Format image
    const file = formatImage(req.file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file.",
      });
    }

    // Check if the admin exists
    const user = await User.findById(admin);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Upload the logo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file);

    // Create new company instance
    const company = new Company({
      name,
      type,
      companyType,
      address,
      admin,
      avatar: cloudinaryResponse.secure_url,
      avatarPublicId: cloudinaryResponse.public_id,
    });

    await company.save();

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: company,
    });
  },

  // Get all companies
  getAllCompanies: async (req: Request, res: Response, next: NextFunction) => {
    const adminId = req.user?._id;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required.",
      });
    }
    const companies = await Company.find({
      admin: adminId,
    });
    res.status(200).json({
      success: true,
      data: companies,
    });
  },

  // Get a single company by ID
  getSingleCompany: async (req: Request, res: Response, next: NextFunction) => {
    const adminId = req.user?._id;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required.",
      });
    }
    const company = await Company.findOne({
      admin: adminId,
      _id: req.params.id,
    });

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
  },

  // Update a company by ID
  updateCompanyProfile: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    // validator
    companyValidator.updateCompanyProfile.parse(req.body);
    const { name, type, companyType, address } = req.body;
    // check id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }
    // Check if company exists
    const company = await Company.findOne({
      admin: adminId,
      _id: req.params.id,
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    // Check if the name exists before
    const companyExist = await Company.findOne({ name });
    if (companyExist) {
      if (`${companyExist._id}`.toString() !== req.params.id.toString())
        return res.status(400).json({
          success: false,
          message: "Company already exists.",
        });
    }

    // Update company fields
    company.name = name !== undefined ? name : company.name;
    company.type = type !== undefined ? type : company.type;
    company.companyType =
      companyType !== undefined ? companyType : company.companyType;
    company.address = address !== undefined ? address : company.address;
    company.updatedAt = new Date();
    await company.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: company,
    });
  },
  updateCompanyLogo: async (req: Request, res: Response) => {
    const adminId = req.user?._id;

    // check id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }
    // Check if the file path exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo file is required.",
      });
    }
    // Check if company exists
    const company = await Company.findOne({
      admin: adminId,
      _id: req.params.id,
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    // Format image
    const file = formatImage(req.file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file.",
      });
    }
    // Upload the logo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file);
    // Update company fields
    company.avatar = cloudinaryResponse.secure_url;
    company.avatarPublicId = cloudinaryResponse.public_id;
    await company.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: company,
    });
  },

  // Delete a company by ID
  deleteCompany: async (req: Request, res: Response) => {
    const adminId = req.user?._id;

    // check id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }
    // Check if company exists
    const company = await Company.findOne({
      admin: adminId,
      _id: req.params.id,
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    const deleteCompany = await Company.findByIdAndDelete(req.params.id);

    if (!deleteCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  },
};

export default companyController;
