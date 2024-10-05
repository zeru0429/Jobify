import mongoose, { Schema } from "mongoose";
import { CompanyType } from "../../types/company_type.js";

const companySchema: Schema<CompanyType> = new Schema({
  name: { type: String, required: true, unique: true },
  avatar: { type: String },
  avatarPublicId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create the Company model
const Company = mongoose.model<CompanyType>("Company", companySchema);

export default Company;
