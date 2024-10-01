import mongoose, { Schema } from "mongoose";
import { JobType } from "../../types/job_type.js";

const jobSchema: Schema<JobType> = new Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },
  type: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  location: {
    required: true,
    type: String,
    trim: true,
  },
  createdAt: {
    required: true,
    type: Date,
  },
  salary: {
    required: true,
    type: Number,
  },
  company: {
    required: true,
    type: String,
    trim: true,
  },
  contactEmail: {
    required: true,
    type: String,
    trim: true,
  },
});

const Job = mongoose.model<JobType>("Job", jobSchema);
export default Job;
