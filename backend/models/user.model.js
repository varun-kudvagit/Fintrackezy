import mongoose from "mongoose";
import { hashValue, compareValues } from "../utils/bcrypt.util.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await hashValue(this.password);
  }
  next();
});

// Compare hashed password
userSchema.methods.comparePassword = async function (value) {
  return compareValues(value, this.password);
};
// Remove password from user object before sending response
userSchema.methods.omitPassword = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
