export interface ICourse {
  name: string;
  code: number;
}

export interface ICourseSchedule {
  courseCode: string;
  lecturer: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  hall: string;
}

interface IUnscheduledCourse extends ICourse {
  lecturer: string;
  studentGroup: string;
}

export interface IAiResponse {
  timetable: ICourseSchedule[];
  unscheduled_courses: IUnscheduledCourse[];
  hash: string;
}
