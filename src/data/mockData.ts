import { User } from '@/types/school';

export const mockUsers: User[] = [
  { id: '1', username: 'admin', name: 'ผู้ดูแลระบบ', role: 'admin', email: 'admin@school.ac.th' },
  { id: '2', username: 'teacher1', name: 'อ.สมศรี ใจดี', role: 'teacher', email: 'somsri@school.ac.th' },
  { id: '3', username: 'teacher2', name: 'อ.ประเสริฐ มั่นคง', role: 'teacher', email: 'prasert@school.ac.th' },
  { id: '4', username: 'student1', name: 'สมชาย รักเรียน', role: 'student', email: 'somchai@student.school.ac.th' },
  { id: '5', username: 'student2', name: 'สมหญิง ตั้งใจ', role: 'student', email: 'somying@student.school.ac.th' },
];

export const mockSubjects = [
  { id: 's1', code: 'MAT101', name: 'คณิตศาสตร์พื้นฐาน', credits: 2, level: 'ม.4', teacherId: '2' },
  { id: 's2', code: 'SCI101', name: 'วิทยาศาสตร์พื้นฐาน', credits: 2, level: 'ม.4', teacherId: '2' },
  { id: 's3', code: 'THA101', name: 'ภาษาไทย', credits: 1.5, level: 'ม.4', teacherId: '3' },
  { id: 's4', code: 'ENG101', name: 'ภาษาอังกฤษ', credits: 2, level: 'ม.4', teacherId: '3' },
  { id: 's5', code: 'SOC101', name: 'สังคมศึกษา', credits: 1.5, level: 'ม.4', teacherId: '2' },
];

export const mockGrades = [
  { id: 'g1', studentId: '4', subjectId: 's1', semester: 1, academicYear: '2568', midterm: 38, final: 42, assignment: 18, total: 82, grade: '4' },
  { id: 'g2', studentId: '4', subjectId: 's2', semester: 1, academicYear: '2568', midterm: 35, final: 38, assignment: 15, total: 73, grade: '3.5' },
  { id: 'g3', studentId: '4', subjectId: 's3', semester: 1, academicYear: '2568', midterm: 40, final: 45, assignment: 19, total: 89, grade: '4' },
  { id: 'g4', studentId: '5', subjectId: 's1', semester: 1, academicYear: '2568', midterm: 30, final: 35, assignment: 14, total: 65, grade: '3' },
  { id: 'g5', studentId: '5', subjectId: 's3', semester: 1, academicYear: '2568', midterm: 42, final: 44, assignment: 20, total: 91, grade: '4' },
];

export const mockAttendance = [
  { id: 'a1', studentId: '4', subjectId: 's1', date: '2568-01-06', status: 'present' as const },
  { id: 'a2', studentId: '4', subjectId: 's1', date: '2568-01-07', status: 'present' as const },
  { id: 'a3', studentId: '4', subjectId: 's1', date: '2568-01-08', status: 'late' as const, note: 'สาย 10 นาที' },
  { id: 'a4', studentId: '4', subjectId: 's2', date: '2568-01-06', status: 'present' as const },
  { id: 'a5', studentId: '4', subjectId: 's2', date: '2568-01-07', status: 'absent' as const },
  { id: 'a6', studentId: '5', subjectId: 's1', date: '2568-01-06', status: 'present' as const },
  { id: 'a7', studentId: '5', subjectId: 's1', date: '2568-01-07', status: 'leave' as const, note: 'ลาป่วย' },
];

export const mockExamSchedules = [
  { id: 'e1', subjectId: 's1', examType: 'midterm' as const, date: '2568-02-15', startTime: '09:00', endTime: '11:00', room: 'ห้อง 301', semester: 1, academicYear: '2568' },
  { id: 'e2', subjectId: 's2', examType: 'midterm' as const, date: '2568-02-16', startTime: '09:00', endTime: '11:00', room: 'ห้อง 302', semester: 1, academicYear: '2568' },
  { id: 'e3', subjectId: 's3', examType: 'midterm' as const, date: '2568-02-17', startTime: '13:00', endTime: '15:00', room: 'ห้อง 201', semester: 1, academicYear: '2568' },
];

export const mockStudentProfiles = [
  { id: '4', userId: '4', studentCode: 'STU67001', firstName: 'สมชาย', lastName: 'รักเรียน', level: 'ม.4', classroom: 'ม.4/1', dateOfBirth: '2552-05-15', parentName: 'นายสมบัติ รักเรียน', parentPhone: '081-234-5678' },
  { id: '5', userId: '5', studentCode: 'STU67002', firstName: 'สมหญิง', lastName: 'ตั้งใจ', level: 'ม.4', classroom: 'ม.4/1', dateOfBirth: '2552-08-20', parentName: 'นางสาวสมใจ ตั้งใจ', parentPhone: '089-876-5432' },
];

export const mockTeacherProfiles = [
  { id: '2', userId: '2', teacherCode: 'TCH001', firstName: 'สมศรี', lastName: 'ใจดี', department: 'กลุ่มสาระคณิตศาสตร์', subjects: ['s1', 's2', 's5'] },
  { id: '3', userId: '3', teacherCode: 'TCH002', firstName: 'ประเสริฐ', lastName: 'มั่นคง', department: 'กลุ่มสาระภาษา', subjects: ['s3', 's4'] },
];

export function authenticate(username: string, password: string): User | null {
  // Mock: password is same as username for demo
  const user = mockUsers.find(u => u.username === username);
  if (user && password === username) return user;
  return null;
}
