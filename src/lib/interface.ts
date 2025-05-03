import { IUser } from "../models/User";
import { Request } from "express";

export interface ICourse {
  name: string;
  code: number;
}

export interface IScheduleInput {
  course_code: string;
  lecturer: string;
  student_group: string;
}

export interface IAiSchedule {
  course_code: string;
  lecturer: string;
  student_group: string;
  time: string;
  hall: string;
}

interface IUnscheduledCourse extends ICourse {
  lecturer: string;
  student_group: string;
}

export interface IAiResponse {
  timetable: IAiSchedule[];
  unscheduled_courses: IUnscheduledCourse[];
  unscheduled?: IUnscheduledCourse[];
  hash: string;
}

export interface IRequestWithUser extends Request {
  user: IUser;
}
