import mongoose, { Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  password: string;
  schoolId: string;
  email: string;
  gender: "male" | "female";
  matricNo: string;
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  schoolId: { type: String, ref: "School", required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  matricNo: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
