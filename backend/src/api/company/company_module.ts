import mongoose, { Schema } from "mongoose";
import { CompanyType } from "../../types/company_type.js";

const companySchema: Schema<CompanyType> = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  companyType: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  avatar: { type: String },
  avatarPublicId: { type: String },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

//  Company model
const Company = mongoose.model<CompanyType>("Company", companySchema);

export default Company;
