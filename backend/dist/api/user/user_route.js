import express from "express";
import userController from "./user_controller.js";
const userRouter = express.Router();
// Create a new user
userRouter.post("/", (req, res) => {
    userController.createUser(req, res);
});
// Get all users
userRouter.get("/", userController.getAllUser);
// Get a single user by ID
userRouter.get("/:id", userController.getSingleUser);
// Update user profile by ID
userRouter.put("/:id/profile", (req, res) => {
    userController.updateProfile(req, res);
});
// Change user password by ID
userRouter.put("/:id/password", (req, res) => {
    userController.changePassword(req, res);
});
// Change user email by ID
userRouter.put("/:id/email", (req, res) => {
    userController.changeEmail(req, res);
});
// Delete a user by ID
userRouter.delete("/:id", (req, res) => {
    userController.deleteUser(req, res);
});
// Export the user router
export default userRouter;
