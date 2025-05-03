import { Response } from "express";
import Hall from "../models/Hall";
import StudentGroup from "../models/StudentGroup";
import Lecturer from "../models/Lecturer";
import Schedule from "../models/Schedule";
import { IAiSchedule } from "./interface";

interface ISchedule extends IAiSchedule {
  day?: string;
}

export const saveAiSchedules = async (aiSchedules: ISchedule[]) => {
  const savedSchedules = [];

  for (const sched of aiSchedules) {
    const { course_code, lecturer, student_group, time, hall } = sched;

    if (!course_code || !lecturer || !student_group || !time || !hall) {
      console.warn("Skipping invalid schedule (missing field):", sched);
      continue;
    }

    const [foundGroup, foundLecturer, foundHall] = await Promise.all([
      StudentGroup.findOne({ shortName: student_group }),
      Lecturer.findOne({ name: lecturer }),
      Hall.findOne({ shortName: hall }),
    ]);

    if (!foundGroup || !foundLecturer || !foundHall) {
      console.warn("Skipping due to missing references:", sched);
      continue;
    }

    const [startTime, endTime] = time.split("-");

    // Find the exact timeSlot
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[new Date().getDay()];
    const timeSlotIndex = foundHall.timeSlots.findIndex(
      (slot) =>
        slot.day === day &&
        slot.startTime === startTime &&
        slot.endTime === endTime
    );

    if (timeSlotIndex === -1) {
      console.warn(`No matching time slot found in hall '${hall}' for`, sched);
      continue;
    }

    // Mark that timeSlot as booked
    foundHall.timeSlots[timeSlotIndex].isBooked = true;

    // Check if ALL time slots are now booked
    const allBooked = foundHall.timeSlots.every((slot) => slot.isBooked);
    if (allBooked) {
      foundHall.isActive = false;
    }

    await foundHall.save();

    const scheduleDoc = {
      course_code,
      student_group: foundGroup._id,
      lecturer: foundLecturer._id,
      hall: foundHall._id,
      time_slot: {
        day,
        startTime,
        endTime,
        isBooked: true,
      },
    };

    const newSchedule = await Schedule.create(scheduleDoc);
    savedSchedules.push(newSchedule._id);
  }

  return savedSchedules;
};

export const getAvailableHallsAndTimes = async (): Promise<{
  availableTimes: string[];
  availableHalls: string[];
}> => {
  const halls = await Hall.find({ isActive: true });

  const availableTimes: Set<string> = new Set();
  const availableHalls: string[] = [];

  for (const hall of halls) {
    let hasAvailableSlot = false;

    for (const slot of hall.timeSlots) {
      if (!slot.isBooked) {
        hasAvailableSlot = true;
        const formattedTime = `${convertTo12Hour(
          slot.startTime
        )}-${convertTo12Hour(slot.endTime)}`;
        availableTimes.add(formattedTime);
      }
    }

    if (hasAvailableSlot) {
      availableHalls.push(hall.shortName);
    }
  }

  return {
    availableTimes: Array.from(availableTimes),
    availableHalls,
  };
};

// Converts "14:00" => "02:00PM"
function convertTo12Hour(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}${suffix}`;
}

export const _res = {
  error: (sts: number, res: Response, message: string) =>
    res.status(sts).json({ failed: true, message }),
  success: (
    sts: number,
    res: Response,
    message: string,
    data?: any,
    meta?: any
  ) => res.status(sts).json({ failed: false, message, data, meta }),
};
