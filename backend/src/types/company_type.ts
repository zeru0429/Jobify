import mongoose, { Document } from "mongoose";

export interface CompanyType extends Document {
  name: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
  admin: mongoose.Schema.Types.ObjectId;
}
