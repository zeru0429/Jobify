import { Document, Types } from "mongoose";

export interface JobType extends Document {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date; // Date of creation
  salary: number; // Salary for the job
  contactEmail: string; // Email for contact
  createdBy: Types.ObjectId; // Reference to the User who created the job
  company: Types.ObjectId; // Reference to the Company (changed to ObjectId)
  updatedAt: Date; // Date of last update
}
