import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleGuard } from "@/components/auth/RoleGuard";

import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentGrades from "@/pages/student/StudentGrades";
import StudentAttendance from "@/pages/student/StudentAttendance";
import StudentExams from "@/pages/student/StudentExams";
import StudentDocuments from "@/pages/student/StudentDocuments";
import StudentProfile from "@/pages/student/StudentProfile";
import PlaceholderPage from "@/components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin routes */}
            <Route path="/admin" element={<RoleGuard allowedRole="admin"><AdminDashboard /></RoleGuard>} />
            <Route path="/admin/staff" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="จัดการบุคลากร" description="เพิ่ม แก้ไข ลบข้อมูลครูและเจ้าหน้าที่" /></RoleGuard>} />
            <Route path="/admin/students" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="จัดการนักเรียน" description="จัดการข้อมูลนักเรียนทั้งหมด" /></RoleGuard>} />
            <Route path="/admin/subjects" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="จัดการรายวิชา" description="เปิด/ปิดรายวิชาและมอบหมายครูผู้สอน" /></RoleGuard>} />
            <Route path="/admin/exams" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="ตารางสอบ" description="จัดการตารางการสอบทุกระดับชั้น" /></RoleGuard>} />
            <Route path="/admin/documents" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="คลังเอกสาร ปพ." description="จัดการเอกสารระเบียนผลการเรียน" /></RoleGuard>} />
            <Route path="/admin/settings" element={<RoleGuard allowedRole="admin"><PlaceholderPage title="ตั้งค่าระบบ" description="ตั้งค่าระบบภาพรวมของโรงเรียน" /></RoleGuard>} />

            {/* Teacher routes */}
            <Route path="/teacher" element={<RoleGuard allowedRole="teacher"><TeacherDashboard /></RoleGuard>} />
            <Route path="/teacher/subjects" element={<RoleGuard allowedRole="teacher"><PlaceholderPage title="รายวิชาของฉัน" description="รายวิชาที่คุณรับผิดชอบสอน" /></RoleGuard>} />
            <Route path="/teacher/grades" element={<RoleGuard allowedRole="teacher"><PlaceholderPage title="บันทึกคะแนน" description="บันทึกและประมวลผลคะแนนนักเรียน" /></RoleGuard>} />
            <Route path="/teacher/attendance" element={<RoleGuard allowedRole="teacher"><PlaceholderPage title="เช็คชื่อเข้าเรียน" description="บันทึกการเข้าเรียนรายวัน" /></RoleGuard>} />
            <Route path="/teacher/documents" element={<RoleGuard allowedRole="teacher"><PlaceholderPage title="อัปโหลดเอกสาร ปพ." description="อัปโหลดเอกสารระเบียนผลการเรียน" /></RoleGuard>} />

            {/* Student routes */}
            <Route path="/student" element={<RoleGuard allowedRole="student"><StudentDashboard /></RoleGuard>} />
            <Route path="/student/grades" element={<RoleGuard allowedRole="student"><StudentGrades /></RoleGuard>} />
            <Route path="/student/attendance" element={<RoleGuard allowedRole="student"><StudentAttendance /></RoleGuard>} />
            <Route path="/student/exams" element={<RoleGuard allowedRole="student"><StudentExams /></RoleGuard>} />
            <Route path="/student/documents" element={<RoleGuard allowedRole="student"><StudentDocuments /></RoleGuard>} />
            <Route path="/student/profile" element={<RoleGuard allowedRole="student"><StudentProfile /></RoleGuard>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
