import User from "./user_module.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/secrete.js";
import mongoose from "mongoose";

const userController = {
  // Create User
  createUser: async (req: Request, res: Response) => {
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

    //check if the role is admin or super admin
    if (req.body.role !== "admin" && req.body.role !== "super_admin") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
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
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });
  },

  // Get All Users
  getAllUser: async (req: Request, res: Response) => {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
  },

  // Get Single User
  getSingleUser: async (req: Request, res: Response) => {
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
  },

  // Update User Profile
  updateProfile: async (req: Request, res: Response) => {
    const { firstName, lastName, role } = req.body;
    //check if the object id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    // check if all body fields are provided
    if (!firstName || !lastName || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check if the role is admin or super admin
    if (role !== "admin" && role !== "super_admin") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

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
  },

  // Change Password
  resetPassword: async (req: Request, res: Response) => {
    const { confirmPassword, password } = req.body;
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedPassword = password.trim();

    if (trimmedConfirmPassword !== trimmedPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if the user id is a valid object ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check if the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate new password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "New password does not meet requirements",
      });
    }
    // Save the user with the new password
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },

  // Change Email
  changeEmail: async (req: Request, res: Response) => {
    const { email } = req.body;

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
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Check if new email already exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Update the email
    user.email = email;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email changed successfully",
    });
  },

  // Delete User
  deleteUser: async (req: Request, res: Response) => {
    //check if the id is valid object
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    // check if user exist
    const isUserExist = await User.findById(req.params.id);
    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
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
  },

  // Login
  login: async (req: Request, res: Response) => {
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
      firstName: user.firstName,
    };

    // Generate token
    const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });

    // Send response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: token,
      },
    });
  },
};

export default userController;
