import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import Hall from "../models/Hall";

export const getHalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const halls = await Hall.find({});

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
    const halls = await Hall.find({ isActive: true });

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

    const existingHall = await Hall.findOne({ shortName });

    if (existingHall) {
      _res.error(400, res, "A hall with this name already exists");
      return;
    }

    const newHall = await Hall.create({ name, shortName, timeSlots });

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
