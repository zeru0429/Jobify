import z from "zod";

export const userValidator = {
  create: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "super_admin"]),
  }),
  updateProfile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "super_admin"]),
  }),
  resetPassword: z.object({
    confirmPassword: z.string(),
    password: z.string(),
  }),
  changeEmail: z.object({
    email: z.string().email(),
  }),
  login: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
};
