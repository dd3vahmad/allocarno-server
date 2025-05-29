import { NextFunction, Request, Response } from "express";
import { _res } from "../lib/utils";
import User, { IUser } from "../models/User";
import { IRequestWithUser } from "../lib/interface";
import School from "../models/School";

const attachJWT = (user: IUser, res: Response) => {
  const token = user.generateAuthToken();

  res.cookie("x-auth-token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // mitigates XSS attacks
    sameSite: "strict", // mitigates CSRF attacks
    secure: process.env.NODE_ENV !== "development" ? true : false,
  });
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req as IRequestWithUser;
    if (!request.user) {
      _res.error(401, res, "You're not authenticated");
      return;
    }
    const validUser = await User.findById(request.user.id);

    if (!validUser) {
      _res.error(404, res, "User not found");
      return;
    }
    _res.success(
      200,
      res,
      "User profile fetched successfully",
      await validUser.getPublicProfile()
    );
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    gender,
    name,
    motto,
    address,
    phone,
    category,
  } = req.body;

  try {
    const existingSchoolWithEmail = await School.findOne({ email });
    if (existingSchoolWithEmail) {
      _res.error(400, res, "Email has already been used");
      return;
    }

    const school = await School.create({
      name,
      email,
      address,
      phone,
      motto,
      category,
    });

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      _res.error(400, res, "Email has already been used");
      return;
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: "admin",
      gender,
      schoolId: school._id,
    });

    attachJWT(user, res);

    _res.success(
      201,
      res,
      "Registration successful",
      await user.getPublicProfile()
    );
  } catch (error: any) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      _res.error(400, res, "Invalid credentials");
      return;
    }

    const validPassword = validUser.comparePassword(password);

    if (!validPassword) {
      _res.error(400, res, "Invalid credentials");
      return;
    }

    attachJWT(validUser, res);

    _res.success(
      200,
      res,
      "Signin successful",
      await validUser.getPublicProfile()
    );
  } catch (error) {
    next(error);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("x-auth-token");
    void req;
    _res.success(200, res, "Signout successful");
  } catch (error) {
    next(error);
  }
};
