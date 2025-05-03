import * as XLSX from "xlsx";
import path from "path";

interface TimetableRow {
  course_code: string;
  lecturer: string;
  student_group: string;
  time: string;
  hall: string;
}

interface LecturerRow {
  name: string;
  gender: "male" | "female";
  rank?: "professor" | "doctor" | "lecturer";
}

interface HallRow {
  name: string;
  shortName: string;
}

interface StudentGroupRow {
  name: string;
  shortName: string;
}

export const parseStudentGroupsExcel = (
  filePath: string
): {
  validRows: StudentGroupRow[];
  errors: { row: number; message: string }[];
} => {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });

  const validRows: StudentGroupRow[] = [];
  const errors: { row: number; message: string }[] = [];

  rows.forEach((row, index) => {
    const { name, shortName } = row;

    if (!name || !shortName) {
      errors.push({
        row: index + 2,
        message: `Missing fields: ${!name ? "name" : ""} ${
          !shortName ? "shortName" : ""
        }`.trim(),
      });
    } else {
      validRows.push({ name, shortName });
    }
  });

  return { validRows, errors };
};

export const parseHallsExcel = (
  filePath: string
): {
  validRows: HallRow[];
  errors: { row: number; message: string }[];
} => {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });

  const validRows: HallRow[] = [];
  const errors: { row: number; message: string }[] = [];

  rows.forEach((row, index) => {
    const { name, shortName } = row;

    if (!name || !shortName) {
      errors.push({
        row: index + 2,
        message: `Missing fields: ${!name ? "name" : ""} ${
          !shortName ? "shortName" : ""
        }`.trim(),
      });
    } else {
      validRows.push({ name, shortName });
    }
  });

  return { validRows, errors };
};

export const parseLecturersExcel = (
  filePath: string
): {
  validRows: LecturerRow[];
  errors: { row: number; message: string }[];
} => {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });

  const validRows: LecturerRow[] = [];
  const errors: { row: number; message: string }[] = [];

  rows.forEach((row, index) => {
    const { name, gender, rank } = row;
    const missing = [];

    if (!name) missing.push("name");
    if (!gender || !["male", "female"].includes(gender)) missing.push("gender");
    if (rank && !["professor", "doctor", "lecturer"].includes(rank)) {
      errors.push({ row: index + 2, message: `Invalid rank: ${rank}` });
      return;
    }

    if (missing.length > 0) {
      errors.push({
        row: index + 2,
        message: `Missing or invalid: ${missing.join(", ")}`,
      });
    } else {
      validRows.push({ name, gender, rank });
    }
  });

  return { validRows, errors };
};

export const parseTimetableExcel = (
  filePath: string
): {
  validRows: TimetableRow[];
  errors: { row: number; message: string }[];
} => {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });

  const validRows: TimetableRow[] = [];
  const errors: { row: number; message: string }[] = [];

  rows.forEach((row, index) => {
    const missingFields = [];

    if (!row.course_code) missingFields.push("course_code");
    if (!row.lecturer) missingFields.push("lecturer");
    if (!row.student_group) missingFields.push("student_group");
    if (!row.time) missingFields.push("time");
    if (!row.hall) missingFields.push("hall");

    if (missingFields.length > 0) {
      errors.push({
        row: index + 2, // +2 to account for header and 0-index
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    } else {
      validRows.push({
        course_code: row.course_code,
        lecturer: row.lecturer,
        student_group: row.student_group,
        time: row.time,
        hall: row.hall,
      });
    }
  });

  return { validRows, errors };
};
