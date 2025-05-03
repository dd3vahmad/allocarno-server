import axios from "axios";
import { IAiResponse, IScheduleInput } from "../lib/interface";
import dotenv from "dotenv";

dotenv.config();

const AI_URI = process.env.AI_URI;

export const generateSchedule = async (
  courses: IScheduleInput[],
  availableTimes: string[],
  availableHalls: string[]
): Promise<IAiResponse> => {
  try {
    if (!AI_URI) {
      throw new Error("AI_URI is not defined");
    }
    if (!Array.isArray(courses) || courses.length === 0) {
      throw new Error("Invalid courses array");
    }
    if (!Array.isArray(availableTimes) || availableTimes.length === 0) {
      throw new Error("Invalid available times array");
    }
    if (!Array.isArray(availableHalls) || availableHalls.length === 0) {
      throw new Error("Invalid available halls array");
    }

    // Validate each course object
    const isValidCourse = (course: IScheduleInput) => {
      return (
        typeof course.course_code === "string" &&
        typeof course.lecturer === "string" &&
        typeof course.student_group === "string"
      );
    };
    const allCoursesValid = courses.every(isValidCourse);
    if (!allCoursesValid) {
      throw new Error("Invalid course object in courses array");
    }

    // Validate available times and halls
    const isValidTime = (time: string) => typeof time === "string";
    const allTimesValid = availableTimes.every(isValidTime);
    if (!allTimesValid) {
      throw new Error("Invalid time in available times array");
    }
    const isValidHall = (hall: string) => typeof hall === "string";
    const allHallsValid = availableHalls.every(isValidHall);
    if (!allHallsValid) {
      throw new Error("Invalid hall in available halls array");
    }

    // Validate AI_URI
    const isValidUri = (uri: string) => typeof uri === "string";
    if (!isValidUri(AI_URI)) {
      throw new Error("Invalid AI_URI");
    }

    const response = await axios.post(`${AI_URI}/generate-schedule`, {
      courses,
      available_times: availableTimes,
      available_halls: availableHalls,
    });

    return { ...response.data, unscheduled: response.data.unscheduled_courses };
  } catch (error) {
    console.error("Error in generateSchedule:", error);
    throw new Error("Failed to generate schedule");
  }
};
