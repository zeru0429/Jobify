import { UserType } from "./user_type.js";
import express from "express";
declare module "express" {
  export interface Request {
    user?: UserType;
  }
}
