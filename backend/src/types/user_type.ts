import { Document } from "mongoose";
export enum Role {
  // admin super_admin user
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super_admin",
}
export interface UserType extends Document {
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
}
