import Job from "./job_module.js";
import { Request, Response } from "express";
const jobController = {
  createJob: (req: Request, res: Response) => {
    try {
      const job = new Job(req.body);
      job.save();
      res.send(Job);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllJob: (req: Request, res: Response) => {
    try {
      const jobs = Job.find();
      res.send(jobs);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getSingleJob: (req: Request, res: Response) => {
    try {
      const job = Job.findById(req.params.id);
      res.send(job);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default jobController;
