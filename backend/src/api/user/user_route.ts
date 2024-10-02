import express from "express";
import { Request, Response } from "express";
import userController from "./user_controller.js";
const userRouter = express.Router();
// use imported routes to define create get all and get single
userRouter.post("/", (req: Request, res: Response) => {
  userController.createUser;
});
userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getSingleUser);
export default userRouter;
