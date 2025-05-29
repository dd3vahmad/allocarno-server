import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import Hall from "../models/Hall";
import { IRequestWithUser } from "../lib/interface";

export const getHalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const halls = await Hall.find({
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(200, res, "Halls fetched successfully", halls);
  } catch (error) {
    next(error);
  }
};

export const getActiveHalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const halls = await Hall.find({
      isActive: true,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    _res.success(200, res, "Halls fetched successfully", halls);
  } catch (error) {
    next(error);
  }
};

export const addHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, shortName, timeSlots } = req.body;

    if (!name || !shortName || !timeSlots.length) {
      _res.error(
        400,
        res,
        "Invalid data input - Hall name, timeSlots and shortName fields are required"
      );
      return;
    }

    const existingHall = await Hall.findOne({
      shortName,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    if (existingHall) {
      _res.error(400, res, "A hall with this name already exists");
      return;
    }

    const newHall = await Hall.create({
      name,
      shortName,
      timeSlots,
      schoolId: (req as IRequestWithUser).user.schoolId,
    });

    if (!newHall) {
      _res.error(400, res, "Error creating hall");
      return;
    }

    _res.success(201, res, "Hall created successfully");
  } catch (error) {
    next(error);
  }
};

export const importHalls = (
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
