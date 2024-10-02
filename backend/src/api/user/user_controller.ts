import User from "./user_module.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/secrete.js";
const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      //check if all fields are provided
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.role ||
        !req.body.email ||
        !req.body.password
      ) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }

      //check if user already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const user = new User(req.body);
      await user.save();
      if (user) {
        res.status(201).json({
          success: true,
          massage: "User created successfully",
          data: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "something is wrong. User not created",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  },

  getAllUser: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        data: users,
        message: "Users fetched successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  },
  getSingleUser: async (req: Request, res: Response) => {
    try {
      if (req.params.id) {
        const user = await User.findById(req.params.id);
        if (user) {
          res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "User not found",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Id not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      //check if email and password provided
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      //check if user exists
      const user = await User.findOne({ email: req.body.email });
      console.log(user);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      //check if password is correct
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
      //prepare payload using jwt
      const payload = {
        id: user._id,
        role: user.role,
      };
      console.log(payload);
      //generate token
      const token = jwt.sign(payload, JWT_SECRET!);

      //send response
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  },
};

export default userController;
