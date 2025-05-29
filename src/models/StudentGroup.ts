import mongoose, { Schema } from "mongoose";

export interface IStudentGroup extends Document {
  name: string;
  shortName: string;
  schoolId: string;
}

const studentGroupSchema = new Schema<IStudentGroup>({
  name: { type: String, required: true },
  shortName: {
    type: String,
    unique: true,
    required: true,
  },
  schoolId: { type: String, ref: "School", required: true },
});

const StudentGroup = mongoose.model<IStudentGroup>(
  "StudentGroup",
  studentGroupSchema
);

export default StudentGroup;
