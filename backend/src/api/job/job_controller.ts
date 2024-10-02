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
        !req.body.createdAt ||
        !req.body.salary ||
        !req.body.company ||
        !req.body.contactEmail ||
        !req.body.contactName ||
        !req.body.contactNumber ||
        !req.body.createdBy
      ) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }
      const job = new Job(req.body);
      await job.save();
      res.send(job);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  getAllJob: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.find();
      res.send(jobs);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getSingleJob: async (req: Request, res: Response) => {
    try {
      const job = await Job.findById(req.params.id);
      res.send(job);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default jobController;
