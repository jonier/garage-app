import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 120 },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export const UserModel = models.User ?? model("User", UserSchema);
