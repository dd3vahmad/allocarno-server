export interface ICourse {
  name: string;
  code: number;
}

export interface ICourseInput {
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
  hash: string;
}
