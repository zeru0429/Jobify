import mongoose, { Schema } from "mongoose";
import { UserType } from "../../types/user_type.js";

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
    trim: true,
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
    validate: {
      validator: (value: string) => {
        const re =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return re.test(String(value));
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid password`,
    },
  },
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
