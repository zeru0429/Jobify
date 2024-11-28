import { Document, Types } from "mongoose";

export interface ApplicationType extends Document {
  job: Types.ObjectId;
  applicantName: string;
  applicantEmail: string;
  resume: string;
  resumePublicId: string;
  coverLetter: string;
  coverLetterPublicId: string;
  status: "applied" | "interviewed" | "offered" | "rejected";
  appliedAt: Date;
}
