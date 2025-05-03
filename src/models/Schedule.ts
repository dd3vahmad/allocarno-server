import mongoose, { Schema } from "mongoose";

export interface ITimeSlot extends Document {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime: string;
  endTime: string;
  isBooked: boolean;
  course: Schema.Types.ObjectId;
}

const timeSlotSchema = new Schema<ITimeSlot>({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: {
    type: String, // Format: "HH:MM" in 24-hour format
    required: true,
  },
  endTime: {
    type: String, // Format: "HH:MM" in 24-hour format
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    default: null,
  },
});

const ScheduleSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  timeSlots: [timeSlotSchema],
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
