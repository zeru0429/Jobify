import mongoose, { Document } from "mongoose";

export interface CompanyType extends Document {
  name: string;
  avatar: string;
  avatarPublicId: string;
  createdAt: Date;
  updatedAt: Date;
  admin: mongoose.Schema.Types.ObjectId;
}
