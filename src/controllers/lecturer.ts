import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import Lecturer from "../models/Lecturer";

export const getLecturers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lecturers = await Lecturer.find({});

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
    const { name, gender, rank } = req.body;

    if (!name || !gender) {
      _res.error(
        400,
        res,
        "Invalid data input - lecturer name and gender fields are required"
      );
      return;
    }

    const existingLecturer = await Lecturer.findOne({ name });

    if (existingLecturer) {
      _res.error(400, res, "A lecturer with this name already exists");
      return;
    }

    const newLecturer = await Lecturer.create({ name, gender, rank });

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
