import { NextFunction, Response, Request } from "express";
import Course from "../models/Course";
import { _res } from "../lib/utils";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find({});
    const formattedCourses = courses.map(({ _id, name, code }) => ({
      id: _id,
      name,
      code,
    }));

    _res.success(200, res, "Courses fetched successfully", formattedCourses);
  } catch (error) {
    next(error);
  }
};

export const addCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, name } = req.body;

    if (!code || !name) {
      _res.error(400, res, "Course code and name are required");
      return;
    }

    const existingCourseWithCode = await Course.findOne({ code });
    if (existingCourseWithCode) {
      _res.error(400, res, "A course wth this code already exists");
      return;
    }

    const newCourse = await Course.create({
      name,
      code,
    });

    _res.success(201, res, "Course created successfully", newCourse);
  } catch (error) {
    next(error);
  }
};
