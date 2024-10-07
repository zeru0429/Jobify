import { NextFunction, Request, Response } from "express";
import Application from "./applicant_module.js";
import mongoose from "mongoose";
import Job from "../job/job_module.js";
import { formatImage } from "../../config/multer.js";
import { v2 as cloudinary } from "cloudinary";
import Company from "../company/company_module.js";
const applicationController = {
  createApplication: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { job, applicantName, applicantEmail, status } = req.body;

    // Validate required fields
    if (!job || !applicantName || !applicantEmail) {
      return res.status(400).json({
        success: false,
        message: "Job, applicant name, and email are required",
      });
    }

    // Check if the job ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(job)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Check if files exist
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Files are required",
      });
    }

    // Check if exactly two files are uploaded
    if (files.length !== 2) {
      return res.status(400).json({
        success: false,
        message: "Exactly two files are required: cover letter and resume.",
      });
    }

    // Check if the job exists
    const jobExists = await Job.findById(job);
    if (!jobExists) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if the job is available
    if (!jobExists.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Job is not available",
      });
    }
    //check if the email register before with this job

    const applicant = await Application.findOne({
      applicantEmail,
      job,
    });
    if (applicant) {
      return res.status(409).json({
        success: false,
        message: "you all ready applied for this job",
      });
    }

    // Process the uploaded files
    const fileContents = files.map((file) => formatImage(file));
    // Filter out undefined values and ensure all are strings
    const validFileContents = fileContents.filter(
      (content): content is string => content !== undefined
    );
    if (validFileContents.length !== 2) {
      return res.status(400).json({
        success: false,
        message: "Both cover letter and resume must be valid files.",
      });
    }

    // Upload the files to Cloudinary
    const coverLetter = await cloudinary.uploader.upload(validFileContents[0], {
      folder: "applications/cover_letters",
      resource_type: "raw",
    });
    const resume = await cloudinary.uploader.upload(validFileContents[1], {
      folder: "applications/resumes",
      resource_type: "raw",
    });

    // Create the application document
    const application = new Application({
      job,
      applicantName,
      applicantEmail,
      resume: resume.secure_url,
      resumePublicId: resume.public_id,
      coverLetter: coverLetter.secure_url,
      coverLetterPublicId: coverLetter.public_id,
      status: status || "applied", // Default to "applied" if status is not provided
    });

    // Save the application document
    await application.save();

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  },

  getAllApplications: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?._id;
      const jobId = req.params.id;
      // check jobId is valid object id
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid job ID.",
        });
      }
      //find job by id
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found.",
        });
      }
      // check if that job is created by admin
      if (job.createdBy.toString() !== adminId?.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this job.",
        });
      }
      //find all applications for the job
      const applications = await Application.find({ job: jobId }).populate(
        "job"
      );

      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching applications.",
      });
    }
  },

  getSingleApplication: async (req: Request, res: Response) => {
    //check if the id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }
    const application = await Application.findById(req.params.id).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    // Check if the job created by the admin matches the job of the application
    const job = await Job.findById(application.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found for this application.",
      });
    }

    // Check if the job was created by the admin
    if (job.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this application.",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  },

  updateApplicationStatus: async (req: Request, res: Response) => {
    //check if the id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }
    const application = await Application.findById(req.params.id).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    // Check if the job created by the admin matches the job of the application
    const job = await Job.findById(application.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found for this application.",
      });
    }

    // Check if the job was created by the admin
    if (job.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this application.",
      });
    }
    application.status = req.body.status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  },

  deleteApplication: async (req: Request, res: Response) => {
    //check if the id is valid object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }
    const application = await Application.findById(req.params.id).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    // Check if the job created by the admin matches the job of the application
    const job = await Job.findById(application.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found for this application.",
      });
    }

    // Check if the job was created by the admin
    if (job.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this application.",
      });
    }
    // delete known
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  },
};

export default applicationController;
