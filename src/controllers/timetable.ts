import { NextFunction, Request, Response } from "express";
import { generateSchedule } from "../services/ai";
import Timetable from "../models/Timetable";
import { _res, getAvailableHallsAndTimes, saveAiSchedules } from "../lib/utils";
import { IRequestWithUser, IScheduleInput } from "../lib/interface";
import DraftScheduledCourse from "../models/DraftSchedule";

export const createTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { schedules } = req.body as { schedules: IScheduleInput[] };

    // Check if schedules is provided and not empty
    if (!Array.isArray(schedules) || schedules.length === 0) {
      _res.error(400, res, "Invalid request argument, schedules is required.");
      return;
    }

    // Check if every object has the required fields
    const hasRequiredFields = schedules.every(
      (s) =>
        s &&
        typeof s.course_code === "string" &&
        typeof s.lecturer === "string" &&
        typeof s.student_group === "string"
    );

    if (!hasRequiredFields) {
      _res.error(
        400,
        res,
        "Each schedule must include course code, lecturer, and student group."
      );
      return;
    }

    const { availableTimes, availableHalls } =
      await getAvailableHallsAndTimes();

    const { timetable, hash, unscheduled } = await generateSchedule(
      schedules,
      availableTimes,
      availableHalls
    );

    const savedSchedules = await saveAiSchedules(timetable);

    const newTimetable = await Timetable.create({
      schedules: savedSchedules,
      unscheduled_courses: unscheduled,
      hash,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(201, res, "Timetable generated successfully", newTimetable);
  } catch (error) {
    next(error);
  }
};

export const draftTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courses } = req.body as { courses: IScheduleInput[] };

    if (!courses.length) {
      _res.error(400, res, "Invalid request argument, courses is required.");
    }

    const { timetable, hash, unscheduled } = await generateSchedule(
      courses,
      [],
      []
    );

    const existing = await Timetable.findOne({ hash });
    if (existing) {
      _res.error(400, res, "Timetable with this hash already exists");
      return;
    }

    const newDraftScheduleCourses = await DraftScheduledCourse.create({
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(
      201,
      res,
      "Timetable draft saved successfully",
      newDraftScheduleCourses
    );
  } catch (error) {
    next(error);
  }
};

export const getTimetableByHash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hash } = req.params;
    const timetable = await Timetable.findOne({
      hash,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    if (!timetable) {
      _res.error(404, res, "Timetable not found");
      return;
    }

    _res.success(200, res, "Timetable fetched successfully", timetable);
  } catch (error) {
    next(error);
  }
};
