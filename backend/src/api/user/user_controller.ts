import User from "./user_module.js";
import { Request, Response } from "express";
const userController = {
  createUser: (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllUser: (req: Request, res: Response) => {
    try {
      const users = User.find();
      res.send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getSingleUser: (req: Request, res: Response) => {
    try {
      const user = User.findById(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default userController;
