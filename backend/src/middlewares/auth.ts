import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../api/user/user_module.js";
import { PayloadType } from "../types/payload_type.js";
import { JWT_SECRET } from "../config/secrete.js";
import { Role, UserType } from "../types/user_type.js"; // Import UserType

const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(403).json({
        success: false,
        message: "Not authorized token not found",
      });
      return; // Ensure to return here to avoid further execution
    }
    const token = authHeader.split(" ")[1]; // Get the token part after "Bearer "

    // Verify the token
    const payload = (await jwt.verify(token, JWT_SECRET!)) as PayloadType;
    if (payload) {
      // Find user from db
      const user = await User.findById(payload.id);

      if (user) {
        req.user = user as UserType;
        next();
      } else {
        res.status(401).json({
          success: false,
          message: "invalid toke user not found",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Not authorized invalid token",
      });
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token expired",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Not authorized invalid token",
      });
    }
  }
};

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user && req.user.role) {
    if (req.user.role === Role.ADMIN) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
  }
};

const isSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user && req.user.role) {
    if (req.user.role === Role.SUPER_ADMIN) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
  }
};

export { isAuth, isAdmin, isSuperAdmin };
