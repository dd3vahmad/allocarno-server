import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import StudentGroup from "../models/StudentGroup";
import { IRequestWithUser } from "../lib/interface";

export const getStudentGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const StudentGroups = await StudentGroup.find({
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(
      200,
      res,
      "Student groups fetched successfully",
      StudentGroups
    );
  } catch (error) {
    next(error);
  }
};

export const addStudentGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, shortName } = req.body;

    if (!name || !shortName) {
      _res.error(
        400,
        res,
        "Invalid data input - Student group name and shortName fields are required"
      );
      return;
    }

    const existingStudentGroup = await StudentGroup.findOne({
      shortName,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    if (existingStudentGroup) {
      _res.error(
        400,
        res,
        "A student group with this short name already exists"
      );
      return;
    }

    const newStudentGroup = await StudentGroup.create({
      name,
      shortName,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    if (!newStudentGroup) {
      _res.error(400, res, "Error creating student group");
      return;
    }

    _res.success(201, res, "Student group created successfully");
  } catch (error) {
    next(error);
  }
};

export const importStudentGroups = (
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
