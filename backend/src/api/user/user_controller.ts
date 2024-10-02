import User from "./user_module.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/secrete.js";

const userController = {
  // Create User
  createUser: async (req: Request, res: Response) => {
    try {
      // Check if all fields are provided
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.role ||
        !req.body.email ||
        !req.body.password
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if user already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const user = new User(req.body);
      await user.save();
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Get All Users
  getAllUser: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        data: users,
        message: "Users fetched successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Get Single User
  getSingleUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json({
          success: true,
          data: user,
          message: "User fetched successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update User Profile
  updateProfile: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, role } = req.body;

      // Check if the user exists
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Update the user fields
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.role = role || user.role;

      await user.save();
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Change Password
  changePassword: async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;

      // Check if the user exists
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if the old password is correct
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Incorrect old password",
        });
      }

      // Validate new password
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          success: false,
          message: "New password does not meet requirements",
        });
      }

      // Hash new password and update
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Change Email
  changeEmail: async (req: Request, res: Response) => {
    try {
      const { newEmail } = req.body;

      // Check if the user exists
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Validate new email
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(newEmail)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }

      // Check if new email already exists
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }

      // Update the email
      user.email = newEmail;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Email changed successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete User
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Login
  login: async (req: Request, res: Response) => {
    try {
      // Check if email and password provided
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if password is correct
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

      // Prepare payload using jwt
      const payload = {
        id: user._id,
        role: user.role,
      };

      // Generate token
      const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });

      // Send response
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
        },
      });
    } catch (e: any) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  },
};

export default userController;
