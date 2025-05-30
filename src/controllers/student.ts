import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import Student from "../models/Student";
import { IRequestWithUser } from "../lib/interface";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find({
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(
      200,
      res,
      "Students fetched successfully",
      students
    );
  } catch (error) {
    next(error);
  }
};

export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, gender, matricNo, email } = req.body;
    const n = name as string;
    const names = n.split(" ");
    const firstName = names[0];
    const lastName = names[1];
    const schoolId = (req as IRequestWithUser).user.schoolId;

    if (!firstName || !lastName || !gender) {
      _res.error(
        400,
        res,
        "Invalid data input - student fullname and gender fields are required"
      );
      return;
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      _res.error(400, res, "A student with this email already exists");
      return;
    }

    const password = new Date().getTime();
    const newStudent = await Student.create({
      name,
      gender,
      matricNo,
      email,
      password,
      schoolId,
    });
    await User.create({
      firstName,
      lastName,
      gender,
      role: "member",
      password,
      email,
      schoolId,
    });

    if (!newStudent) {
      _res.error(400, res, "Error creating student");
      return;
    }

    _res.success(201, res, "Student created successfully");
  } catch (error) {
    next(error);
  }
};

export const importStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
  } catch (error) {
    next(error);
  }
};
