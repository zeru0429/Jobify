import mongoose, { Schema } from "mongoose";
import { Role, UserType } from "../../types/user_type.js";
import bcrypt from "bcrypt";

const userSchema: Schema<UserType> = new Schema({
  firstName: {
    required: true,
    type: String,
    trim: true,
  },
  lastName: {
    required: true,
    type: String,
    trim: true,
  },
  role: {
    required: true,
    type: String,
    enum: [Role.ADMIN, Role.SUPER_ADMIN],
    trim: true,
    default: Role.ADMIN,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address`,
    },
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return;
  }
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
