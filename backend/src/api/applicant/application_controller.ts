import { Request, Response } from "express";
import Application from "./applicant_module.js";

const applicationController = {
  createApplication: async (req: Request, res: Response) => {
    try {
      const {
        job,
        applicantName,
        applicantEmail,
        resume,
        coverLetter,
        status,
      } = req.body;

      // Validate required fields
      if (!job || !applicantName || !applicantEmail) {
        return res.status(400).json({
          success: false,
          message: "Job, applicant name, and email are required",
        });
      }

      const application = new Application({
        job,
        applicantName,
        applicantEmail,
        resume,
        coverLetter,
        status,
      });

      await application.save();
      res.status(201).json({
        success: true,
        message: "Application created successfully",
        data: application,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getAllApplications: async (req: Request, res: Response) => {
    try {
      const applications = await Application.find().populate("job");
      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getSingleApplication: async (req: Request, res: Response) => {
    try {
      const application = await Application.findById(req.params.id).populate(
        "job"
      );
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  updateApplication: async (req: Request, res: Response) => {
    try {
      const application = await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Application updated successfully",
        data: application,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  deleteApplication: async (req: Request, res: Response) => {
    try {
      const application = await Application.findByIdAndDelete(req.params.id);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Application deleted successfully",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default applicationController;
