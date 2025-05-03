import { Response } from "express";
import Hall from "../models/Hall";

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
