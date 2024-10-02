import { Document, Types } from "mongoose";

export interface JobType extends Document {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date; // Changed to Date
  salary: number;
  company: string;
  contactEmail: string;
  contactName: string;
  contactNumber: string;
  createdBy: Types.ObjectId; // Changed to ObjectId
}
