import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  schoolId: { type: String, ref: "School", required: true },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
