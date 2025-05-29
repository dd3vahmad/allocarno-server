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
}

export interface IHall extends Document {
  name: string;
  schoolId: string;
  capacity: number;
  shortName: string;
  timeSlots: ITimeSlot[];
  isActive: boolean;
}

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
});

const hallSchema = new Schema<IHall>({
  name: { type: String, required: true },
  schoolId: { type: String, ref: "School", required: true },
  shortName: {
    type: String,
    unique: true,
    required: true,
  },
  timeSlots: [timeSlotSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Hall = mongoose.model<IHall>("Hall", hallSchema);

export default Hall;
