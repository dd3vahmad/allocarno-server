import { NextFunction, Response } from "express";
import { _res } from "../lib/utils";
import jwt from "jsonwebtoken";
import { IRequestWithUser } from "../lib/interface";
import User from "../models/User";

export const authenticate = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["x-auth-token"];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      _res.error(500, res, "Key not found");
      return;
    }

    if (!token) {
      _res.error(401, res, "Unauthenticated - No token provided.");
      return;
    }

    try {
      const decoded = jwt.verify(token, secret);
      const user = await User.findById((decoded as any).id);

      if (!user) {
        _res.error(401, res, "Unauthenticated - User not found.");
        return;
      }

      req.user = user;
      return next();
    } catch (error) {
      _res.error(401, res, "Unauthenticated - Invalid token.");
      return;
    }
  } catch (error) {
    next(error);
  }
};
