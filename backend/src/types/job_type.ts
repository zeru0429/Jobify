import { Document } from "mongoose";
export interface JobType extends Document {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date;
  salary: number;
  company: string;
  contactEmail: string;
  contactName: string;
  contactNumber: string;
}
