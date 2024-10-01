import express from "express";
import userController from "./user_controller.js";
const userRouter = express.Router();
// use imported routes to define create get all and get single
userRouter.post("/user", userController.createUser);
userRouter.get("/user", userController.getAllUser);
userRouter.get("/user/:id", userController.getSingleUser);
export default userRouter;
