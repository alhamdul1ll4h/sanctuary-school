export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export interface Student {
  id: string;
  userId: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  level: string; // ม.1 - ม.6
  classroom: string;
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
}

export interface Teacher {
  id: string;
  userId: string;
  teacherCode: string;
  firstName: string;
  lastName: string;
  department: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  level: string;
  teacherId: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  semester: number;
  academicYear: string;
  midterm: number;
  final: number;
  assignment: number;
  total: number;
  grade: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'present' | 'late' | 'leave' | 'absent';
  note?: string;
}

export interface ExamSchedule {
  id: string;
  subjectId: string;
  examType: 'midterm' | 'final';
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  semester: number;
  academicYear: string;
}

export interface Document {
  id: string;
  studentId: string;
  type: 'ปพ.1' | 'ปพ.2' | 'ปพ.3' | 'ปพ.4' | 'ปพ.5' | 'ปพ.6' | 'ปพ.7';
  fileName: string;
  uploadedAt: string;
  uploadedBy: string;
  level: 'ม.3' | 'ม.6';
}

export const ROLE_PATHS: Record<UserRole, string> = {
  admin: '/admin',
  teacher: '/teacher',
  student: '/student',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'ผู้ดูแลระบบ',
  teacher: 'อาจารย์',
  student: 'นักเรียน',
};
