import Company from "../company/company_module.js";
import { Request, Response } from "express";
import Job from "../job/job_module.js";
import Application from "../applicant/applicant_module.js";
import { Role } from "../../types/user_type.js";

const dashboardController = {
  getCompanyTypes: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const adminRole = req.user?.role;
    let companyTypeCounts;

    if (adminRole === Role.SUPER_ADMIN) {
      // Total aggregate for super admin
      companyTypeCounts = await Company.aggregate([
        {
          $group: {
            _id: "$companyType",
            count: { $sum: 1 },
          },
        },
      ]);
    } else {
      // Specific aggregate for admin using admin id
      companyTypeCounts = await Company.aggregate([
        {
          $match: {
            admin: adminId,
          },
        },
        {
          $group: {
            _id: "$companyType",
            count: { $sum: 1 },
          },
        },
      ]);
    }

    // Format the result into the desired structure
    const formattedResult = companyTypeCounts.map((companyType) => ({
      label: companyType._id,
      value: companyType.count,
    }));

    return res.status(200).json({
      success: true,
      data: formattedResult,
    });
  },

  getJobTypes: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const adminRole = req.user?.role;
    let jobTypeCounts;

    if (adminRole === Role.SUPER_ADMIN) {
      jobTypeCounts = await Job.aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ]);
    } else {
      jobTypeCounts = await Job.aggregate([
        {
          $match: {
            createdBy: adminId,
          },
        },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ]);
    }

    // Format the result into the desired structure
    const formattedResult = jobTypeCounts.map((jobType) => ({
      label: jobType._id,
      value: jobType.count,
    }));

    return res.status(200).json({
      success: true,
      data: formattedResult,
    });
  },

  getCompanyJobs: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const adminRole = req.user?.role;
    let jobsPerCompany;

    if (adminRole === Role.SUPER_ADMIN) {
      jobsPerCompany = await Job.aggregate([
        {
          $group: {
            _id: "$company",
            jobCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "_id",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
        {
          $unwind: "$companyDetails",
        },
        {
          $project: {
            _id: 0,
            company: "$companyDetails.name",
            jobs: "$jobCount",
          },
        },
      ]);
    } else {
      jobsPerCompany = await Job.aggregate([
        {
          $match: {
            createdBy: adminId,
          },
        },
        {
          $group: {
            _id: "$company",
            jobCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "_id",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
        {
          $unwind: "$companyDetails",
        },
        {
          $project: {
            _id: 0,
            company: "$companyDetails.name",
            jobs: "$jobCount",
          },
        },
      ]);
    }

    return res.status(200).json({
      success: true,
      data: jobsPerCompany,
    });
  },

  getMonthlyApplicants: async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const adminRole = req.user?.role;
    let applicantCounts;

    if (adminRole === Role.SUPER_ADMIN) {
      applicantCounts = await Application.aggregate([
        {
          $addFields: {
            month: { $month: "$appliedAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            applicants: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            month: {
              $arrayElemAt: [
                [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                "$_id",
              ],
            },
            applicants: "$applicants",
          },
        },
      ]);
    } else {
      applicantCounts = await Application.aggregate([
        {
          $match: {
            createdBy: adminId,
          },
        },
        {
          $addFields: {
            month: { $month: "$appliedAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            applicants: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            month: {
              $arrayElemAt: [
                [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                "$_id",
              ],
            },
            applicants: "$applicants",
          },
        },
      ]);
    }

    return res.status(200).json({
      success: true,
      data: applicantCounts,
    });
  },
};

export default dashboardController;
