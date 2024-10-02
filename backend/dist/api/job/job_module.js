import mongoose, { Schema } from "mongoose";
const jobSchema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true,
    },
    type: {
        required: true,
        type: String,
        trim: true,
    },
    description: {
        required: true,
        type: String,
        trim: true,
    },
    location: {
        required: true,
        type: String,
        trim: true,
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now,
    },
    salary: {
        required: true,
        type: Number,
    },
    contactEmail: {
        required: true,
        type: String,
        trim: true,
    },
    createdBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    company: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
// Create and export the Job model
const Job = mongoose.model("Job", jobSchema);
export default Job;
