import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import Lecturer from "../models/Lecturer";
import User from "../models/User";
import { IRequestWithUser } from "../lib/interface";

export const getLecturers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lecturers = await Lecturer.find({
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(200, res, "Lecturers fetched successfully", lecturers);
  } catch (error) {
    next(error);
  }
};

export const addLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, gender, rank, email } = req.body;
    const n = name as string;
    const names = n.split(" ");
    const firstName = names[0];
    const lastName = names[1];
    const schoolId = (req as IRequestWithUser).user.schoolId;

    if (!firstName || !lastName || !gender) {
      _res.error(
        400,
        res,
        "Invalid data input - lecturer fullname and gender fields are required"
      );
      return;
    }

    const existingLecturer = await Lecturer.findOne({ email });

    if (existingLecturer) {
      _res.error(400, res, "A lecturer with this email already exists");
      return;
    }

    const password = new Date().getTime();
    const newLecturer = await Lecturer.create({
      name,
      gender,
      rank,
      email,
      password,
      schoolId,
    });
    await User.create({
      firstName,
      lastName,
      gender,
      role: "lecturer",
      password,
      email,
      schoolId,
    });

    if (!newLecturer) {
      _res.error(400, res, "Error creating lecturer");
      return;
    }

    _res.success(201, res, "Lecturer created successfully");
  } catch (error) {
    next(error);
  }
};

export const importLecturers = (
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
