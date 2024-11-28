import express, { Request, Response } from "express";
import userController from "./user_controller.js";
import { errorHandlerMethod } from "../../config/errorHandler.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/", errorHandlerMethod(userController.createUser));

// Get all users
userRouter.get("/", errorHandlerMethod(userController.getAllUser));

// Get a single user by ID
userRouter.get("/:id", errorHandlerMethod(userController.getSingleUser));

// Update user profile by ID
userRouter.patch(
  "/:id/profile",
  errorHandlerMethod(userController.updateProfile)
);

// Change user password by ID
userRouter.patch(
  "/:id/password",
  errorHandlerMethod(userController.resetPassword)
);

// Change user email by ID
userRouter.patch("/:id/email", errorHandlerMethod(userController.changeEmail));

// Delete a user by ID
userRouter.delete("/:id", errorHandlerMethod(userController.deleteUser));

// Export the user router
export default userRouter;
