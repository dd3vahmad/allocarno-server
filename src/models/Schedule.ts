import mongoose, { Schema } from "mongoose";
import { ITimeSlot } from "./Hall";

const ScheduleSchema = new mongoose.Schema({
  student_group: {
    type: Schema.Types.ObjectId,
    ref: "StudentGroup",
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Lecturer",
    required: true,
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  timeSlot: { type: Object },
});

ScheduleSchema.index(
  {
    hall: 1,
    "timeSlots.day": 1,
    "timeSlots.startTime": 1,
    "timeSlots.endTime": 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
