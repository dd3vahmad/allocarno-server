import mongoose, { Schema } from "mongoose";

export interface ILecturer extends Document {
  name: string;
  password: string;
  schoolId: string;
  email: string;
  gender: "male" | "female";
  rank?: "professor" | "doctor" | "lecturer";
}

const lecturerSchema = new Schema<ILecturer>({
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
  rank: {
    type: String,
    enum: ["professor", "doctor", "lecturer"],
    default: "lecturer",
  },
});

const Lecturer = mongoose.model<ILecturer>("Lecturer", lecturerSchema);

export default Lecturer;
