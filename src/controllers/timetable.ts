import { NextFunction, Request, Response } from "express";
import { generateSchedule } from "../services/ai";
import Timetable from "../models/Timetable";
import { _res, getAvailableHallsAndTimes } from "../lib/utils";
import { ISchedule } from "../lib/interface";
import DraftScheduledCourse from "../models/DraftSchedule";

export const createTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { schedules } = req.body as { schedules: ISchedule[] };

    if (!schedules.length) {
      _res.error(400, res, "Invalid request argument, schedules is required.");
    }

    const { availableTimes, availableHalls } =
      await getAvailableHallsAndTimes();

    const { timetable, hash, unscheduled } = await generateSchedule(
      schedules,
      availableTimes,
      availableHalls
    );

    const existing = await Timetable.findOne({ hash });
    if (existing) {
      _res.error(400, res, "Timetable with this hash already exists");
      return;
    }

    const newTimetable = await Timetable.create({
      schedules,
      unscheduled_courses: unscheduled,
      hash,
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
    const { courses } = req.body as { courses: ISchedule[] };

    if (!courses.length) {
      _res.error(400, res, "Invalid request argument, courses is required.");
    }

    const { timetable, hash, unscheduled_courses } = await generateSchedule(
      courses,
      [],
      []
    );

    const existing = await Timetable.findOne({ hash });
    if (existing) {
      _res.error(400, res, "Timetable with this hash already exists");
      return;
    }

    const newDraftScheduleCourses = await DraftScheduledCourse.create();

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
    const timetable = await Timetable.findOne({ hash });

    if (!timetable) {
      _res.error(404, res, "Timetable not found");
      return;
    }

    _res.success(200, res, "Timetable fetched successfully", timetable);
  } catch (error) {
    next(error);
  }
};
