import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import jwt from "jsonwebtoken";
import { IRequestWithUser } from "../lib/interface";

export const authenticate = async (
  req: Request,
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

    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      _res.error(401, res, "Unauthenticated - User not found.");
      return;
    }

    (req as IRequestWithUser).user = decoded as any;
    return next();
  } catch (error) {
    next(error);
  }
};
