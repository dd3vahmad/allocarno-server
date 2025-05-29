import mongoose, { Schema, Document, Types } from "mongoose";

interface IUnscheduledCourse {
  course_code: string;
  instructor: Types.ObjectId;
  student_group: Types.ObjectId;
}

export interface ITimetable extends Document {
  schedules: Types.ObjectId[];
  unscheduled_courses: IUnscheduledCourse[];
  hash: string;
  schoolId: string;
  createdAt?: Date;
}

const UnscheduledCourseSchema = new Schema<IUnscheduledCourse>(
  {
    course_code: { type: String, required: true },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
    },
    student_group: {
      type: Schema.Types.ObjectId,
      ref: "StudentGroup",
      required: true,
    },
  },
  { _id: false }
);

const TimetableSchema = new Schema<ITimetable>(
  {
    schedules: [
      { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
    ],
    unscheduled_courses: { type: [UnscheduledCourseSchema], required: true },
    hash: { type: String, required: true, unique: true },
    schoolId: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

const Timetable = mongoose.model<ITimetable>("Timetable", TimetableSchema);
export default Timetable;
