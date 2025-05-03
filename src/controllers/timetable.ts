import { NextFunction, Request, Response } from "express";
import { generateSchedule } from "../services/ai";
import Timetable from "../models/Timetable";
import { _res } from "../lib/utils";
import { ICourseInput } from "../lib/interface";
import DraftScheduledCourse from "../models/DraftScheduleCourse";

export const createTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courses } = req.body as { courses: ICourseInput[] };

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

    const newTimetable = await Timetable.create({
      timetable,
      unscheduled_courses,
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
    const { courses } = req.body as { courses: ICourseInput[] };

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
