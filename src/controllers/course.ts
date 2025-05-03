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
    const { course_code, name, student_group_id, instructor_id } = req.body;

    const existingCourseWithCode = await Course.findOne({ code: course_code });
    if (existingCourseWithCode) {
      _res.error(400, res, "A course wth this code already exists");
      return;
    }

    const validStudentGroup = await StudentGroup.findById(student_group_id);
    if (!validStudentGroup) {
      _res.error(400, res, "Student group Id is invalid");
      return;
    }

    const validInstructor = await Lecturer.findById(instructor_id);
    if (!validInstructor) {
      _res.error(400, res, "Instructor Id is invalid");
      return;
    }

    const newCourse = await Course.create({
      name,
      code: course_code,
      instructor: instructor_id,
    });

    _res.success(201, res, "Course created successfully");
  } catch (error) {
    next(error);
  }
};
