// @types/express.d.ts
import { UserType } from "./user_type.js";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: UserType;
    filePath?: string;
    logoPath?: string;
  }
}
