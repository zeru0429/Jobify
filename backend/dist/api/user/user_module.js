var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
import { Role } from "../../types/user_type.js";
import bcrypt from "bcrypt";
const userSchema = new Schema({
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
            validator: (value) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase());
            },
            message: (props) => `${props.value} is not a valid email address`,
        },
    },
    password: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/;
                return re.test(String(value));
            },
            message: (props) => `${props.value} is not a valid password`,
        },
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(10);
            this.password = yield bcrypt.hash(this.password, salt);
            next();
        }
        catch (error) {
            return;
        }
    });
});
const User = mongoose.model("User", userSchema);
export default User;
