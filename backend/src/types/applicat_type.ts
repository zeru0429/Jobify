import { Document, Types } from "mongoose";

export interface ApplicationType extends Document {
  job: Types.ObjectId;
  applicantName: string;
  applicantEmail: string;
  resume?: string;
  coverLetter?: string;
  status: "applied" | "interviewed" | "offered" | "rejected";
  appliedAt: Date;
}
