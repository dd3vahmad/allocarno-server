import mongoose, { Schema, Document } from "mongoose";

interface IDraftScheduledCourse {
  course_code: string;
  lecturer: string;
  student_group: string;
  time: string;
  hall: string;
}

export interface IDraftSchedule extends Document {
  courses: IDraftScheduledCourse[];
}

const draftScheduleCourseSchema = new Schema<IDraftScheduledCourse>({
  course_code: { type: String, required: true },
  lecturer: { type: String, required: true },
  student_group: { type: String, required: true },
  time: { type: String, required: true },
  hall: { type: String, required: true },
});

const draftScheduleSchema = new Schema<IDraftSchedule>({
  courses: [draftScheduleCourseSchema],
});

const DraftSchedule = mongoose.model<IDraftSchedule>(
  "DraftSchedule",
  draftScheduleSchema
);

export default DraftSchedule;
