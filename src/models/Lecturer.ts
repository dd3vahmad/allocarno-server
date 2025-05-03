import mongoose, { Schema } from "mongoose";

export interface ILecturer extends Document {
  name: string;
  gender: "male" | "female";
  rank?: "professor" | "doctor" | "lecturer";
}

const lecturerSchema = new Schema<ILecturer>({
  name: { type: String, required: true },
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
