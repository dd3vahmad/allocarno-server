import axios from "axios";
import { IAiResponse, ISchedule } from "../lib/interface";

const AI_URI = process.env.AI_URI;

export const generateSchedule = async (
  courses: ISchedule[],
  availableTimes: string[],
  availableHalls: string[]
): Promise<IAiResponse> => {
  const response = await axios.post(`${AI_URI}/generate-schedule`, {
    courses,
    available_times: availableTimes,
    available_halls: availableHalls,
  });

  return { ...response.data, unscheduled: response.data.unscheduled_courses };
};
