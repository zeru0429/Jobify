import { Document, Types } from "mongoose";

export interface JobType extends Document {
  isAvailable: boolean;
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date;
  salary: number;
  contactEmail: string;
  createdBy: Types.ObjectId;
  company: Types.ObjectId;
  updatedAt: Date;
}
