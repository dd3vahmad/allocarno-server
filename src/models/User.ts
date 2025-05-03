import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  gender: "male" | "female";
  role?: "admin" | "group-rep" | "member";
}

const userSchema = new Schema<IUser>({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "group-rep", "member"],
    default: "member",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
