import { NextFunction, Response, Request } from "express";
import Course from "../models/Course";
import { _res } from "../lib/utils";
import StudentGroup from "../models/StudentGroup";
import Lecturer from "../models/Lecturer";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find({});

    _res.success(200, res, "Courses fethced successfully", courses);
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
    const { course_code, name } = req.body;

    if (!course_code || !name) {
      _res.error(400, res, "Course code and name are required");
      return;
    }

    const existingCourseWithCode = await Course.findOne({ code: course_code });
    if (existingCourseWithCode) {
      _res.error(400, res, "A course wth this code already exists");
      return;
    }

    const newCourse = await Course.create({
      name,
      code: course_code,
    });

    _res.success(201, res, "Course created successfully", newCourse);
  } catch (error) {
    next(error);
  }
};
