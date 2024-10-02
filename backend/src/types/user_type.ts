import { Document } from "mongoose";
export enum Role {
  // admin super_admin user
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}
export interface UserType extends Document {
  firstName: string;
  lastName: string;
  role: Role | Role.ADMIN;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
