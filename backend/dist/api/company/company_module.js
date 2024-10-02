import mongoose, { Schema } from "mongoose";
const companySchema = new Schema({
    name: { type: String, required: true, unique: true },
    logo: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
// Create the Company model
const Company = mongoose.model("Company", companySchema);
export default Company;
