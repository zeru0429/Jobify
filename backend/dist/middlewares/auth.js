var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../api/user/user_module.js";
import { JWT_SECRET } from "../config/secrete.js";
import { Role } from "../types/user_type.js"; // Import UserType
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(403).json({
                success: false,
                message: "Not authorized",
            });
            return; // Ensure to return here to avoid further execution
        }
        const token = authHeader.split(" ")[1]; // Get the token part after "Bearer "
        // Verify the token
        const payload = (yield jwt.verify(token, JWT_SECRET));
        if (payload) {
            // Find user from db
            const user = yield User.findById(payload.id);
            if (user) {
                req.user = user; // Cast to UserType since user is not null
                next(); // Call the next middleware
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
        }
        else {
            res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }
});
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role) {
        if (req.user.role === Role.ADMIN) {
            next();
        }
        else {
            res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }
    }
});
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role) {
        if (req.user.role === Role.SUPER_ADMIN) {
            next();
        }
        else {
            res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }
    }
});
const isAdminOrSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role) {
        if (req.user.role === Role.ADMIN || req.user.role === Role.SUPER_ADMIN) {
            next();
        }
        else {
            res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }
    }
});
export { isAuth, isAdmin, isSuperAdmin, isAdminOrSuperAdmin };
