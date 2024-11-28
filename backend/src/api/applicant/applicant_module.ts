import mongoose, { Schema } from "mongoose";
import { ApplicationType } from "../../types/applicant_type.js";

const applicationSchema: Schema<ApplicationType> = new Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  resume: { type: String },
  resumePublicId: { type: String },
  coverLetter: { type: String },
  coverLetterPublicId: { type: String },
  status: {
    type: String,
    enum: ["applied", "interviewed", "offered", "rejected"],
    default: "applied",
  },
  appliedAt: { type: Date, default: Date.now },
});

// Create and export the Application model
const Application = mongoose.model<ApplicationType>(
  "Application",
  applicationSchema
);
export default Application;
