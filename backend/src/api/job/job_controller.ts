import Job from "./job_module.js";
import { Request, Response } from "express";

const jobController = {
  createJob: async (req: Request, res: Response) => {
    try {
      req.body.createdBy = req.user?.id;

      if (
        !req.body.title ||
        !req.body.type ||
        !req.body.description ||
        !req.body.location ||
        !req.body.salary ||
        !req.body.company ||
        !req.body.contactEmail ||
        !req.body.contactName ||
        !req.body.contactNumber ||
        !req.body.createdBy
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const job = new Job(req.body);
      await job.save();
      res.status(201).json({
        success: true,
        message: "Job created successfully",
        data: job,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllJob: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.find();
      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getSingleJob: async (req: Request, res: Response) => {
    try {
      const job = await Job.findById(req.params.id);
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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateJob: async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteJob: async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default jobController;
