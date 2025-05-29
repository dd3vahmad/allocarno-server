import mongoose, { Schema } from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  course_code: {
    type: String,
    required: true,
  },
  student_group: {
    type: Schema.Types.ObjectId,
    ref: "StudentGroup",
    required: true,
  },
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: "Lecturer",
    required: true,
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  time_slot: { type: Object },
  schoolId: { type: String, ref: "School", required: true },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
