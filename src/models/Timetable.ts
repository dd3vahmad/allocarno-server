import mongoose, { Schema, Document } from "mongoose";

interface ScheduledCourse {
  course_code: string;
  lecturer: string;
  student_group: string;
  time: string;
  hall: string;
}

interface UnscheduledCourse {
  course_code: string;
  lecturer: string;
  student_group: string;
}

export interface ITimetable extends Document {
  timetable: ScheduledCourse[];
  unscheduled_courses: UnscheduledCourse[];
  hash: string;
  createdAt?: Date;
}

const ScheduledCourseSchema = new Schema<ScheduledCourse>(
  {
    course_code: { type: String, required: true },
    lecturer: { type: String, required: true },
    student_group: { type: String, required: true },
    time: { type: String, required: true },
    hall: { type: String, required: true },
  },
  { _id: false }
);

const UnscheduledCourseSchema = new Schema<UnscheduledCourse>(
  {
    course_code: { type: String, required: true },
    lecturer: { type: String, required: true },
    student_group: { type: String, required: true },
  },
  { _id: false }
);

const TimetableSchema = new Schema<ITimetable>(
  {
    timetable: { type: [ScheduledCourseSchema], required: true },
    unscheduled_courses: { type: [UnscheduledCourseSchema], required: true },
    hash: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITimetable>("Timetable", TimetableSchema);
