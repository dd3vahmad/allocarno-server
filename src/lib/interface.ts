import { IUser } from "../models/User";
import { Request } from "express";

export interface ICourse {
  name: string;
  code: number;
}

export interface ISchedule {
  code: string;
  lecturer: string;
  student_group: string;
}

export interface ICourseSchedule {
  course_code: string;
  lecturer: string;
  start_time: string;
  end_time: string;
  day_of_week: string;
  hall: string;
}

interface IUnscheduledCourse extends ICourse {
  lecturer: string;
  student_group: string;
}

export interface IAiResponse {
  timetable: ICourseSchedule[];
  unscheduled_courses: IUnscheduledCourse[];
  unscheduled?: IUnscheduledCourse[];
  hash: string;
}

export interface IRequestWithUser extends Request {
  user: IUser;
}
