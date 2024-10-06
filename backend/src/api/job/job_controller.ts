import mongoose from "mongoose";
import Job from "./job_module.js";
import { NextFunction, Request, Response } from "express";
import User from "../user/user_module.js";
import Company from "../company/company_module.js";

const jobController = {
  createJob: async (req: Request, res: Response, next: NextFunction) => {
    req.body.createdBy = req.user?._id;
    if (
      !req.body.title ||
      !req.body.type ||
      !req.body.description ||
      !req.body.location ||
      !req.body.salary ||
      !req.body.company ||
      !req.body.contactEmail ||
      !req.body.createdBy
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check company is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.body.company)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }
    //check createdBy id is Valid object
    if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    // check user exist this id
    const user = await User.findById(req.body.createdBy);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // check if company  exist
    const company = await Company.findById(req.body.company);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const job = new Job(req.body);

    await job.save();
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  },

  getAllJob: async (req: Request, res: Response) => {
    const adminId = req.user?._id;

    const jobs = await Job.find({
      createdBy: adminId,
    });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  },

  getSingleJob: async (req: Request, res: Response, next: NextFunction) => {
    const adminId = req.user?._id;
    //check if the id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }
    const job = await Job.findOne({
      createdBy: adminId,
      _id: req.params?.id,
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  },

  updateJob: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    req.body.createdBy = req.user?._id;
    // Check if all body fields are provided
    if (
      !req.body.title ||
      !req.body.type ||
      !req.body.description ||
      !req.body.location ||
      !req.body.salary ||
      !req.body.company ||
      !req.body.contactEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if company ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.body.company)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    // Check if createdBy ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    //check id is valid object
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }
    // Check if the user exists
    const user = await User.findById(req.body.createdBy);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the company exists
    const company = await Company.findById(req.body.company);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check if the job exists
    const jobExist = await Job.findOne({
      createdBy: adminId,
      _id: req.params.id, // Fixed this line
    });
    if (!jobExist) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Update the job
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  },

  deleteJob: async (req: Request, res: Response) => {
    // check if the id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  },
};

export default jobController;
