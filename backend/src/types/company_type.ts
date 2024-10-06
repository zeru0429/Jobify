import mongoose, { Document } from "mongoose";

export interface CompanyType extends Document {
  name: string;
  type: string;
  companyType: string;
  description?: string;
  isActive: boolean;
  avatar: string;
  avatarPublicId: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  admin: mongoose.Schema.Types.ObjectId;
}
