import mongoose, { Schema } from "mongoose";
import { JobType } from "../../types/job_type.js";

const jobSchema: Schema<JobType> = new Schema({
  isAvailable: {
    required: true,
    type: Boolean,
    default: true,
  },
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
    default: Date.now,
  },
  salary: {
    required: true,
    type: Number,
  },
  contactEmail: {
    required: true,
    type: String,
    trim: true,
  },
  createdBy: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Job model
const Job = mongoose.model<JobType>("Job", jobSchema);
export default Job;
