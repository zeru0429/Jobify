import mongoose, { Schema } from "mongoose";
const applicationSchema = new Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicantName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    resume: { type: String },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ["applied", "interviewed", "offered", "rejected"],
        default: "applied",
    },
    appliedAt: { type: Date, default: Date.now },
});
// Create and export the Application model
const Application = mongoose.model("Application", applicationSchema);
export default Application;
