import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import { BookOpen, Users, ClipboardCheck, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockSubjects, mockStudentProfiles, mockTeacherProfiles, mockAttendance } from '@/data/mockData';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const teacherProfile = mockTeacherProfiles.find(t => t.userId === user?.id);
  const mySubjects = mockSubjects.filter(s => s.teacherId === user?.id);
  const myStudentCount = mockStudentProfiles.length; // simplified
  const todayAttendance = mockAttendance.filter(a => a.status === 'present').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            สวัสดี, {teacherProfile ? `${teacherProfile.firstName} ${teacherProfile.lastName}` : user?.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {teacherProfile?.department || 'กลุ่มสาระการเรียนรู้'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="รายวิชาที่สอน" value={mySubjects.length} subtitle="เทอม 1/2568" icon={<BookOpen className="w-5 h-5" />} variant="gold" />
          <StatCard title="นักเรียนในชั้นเรียน" value={myStudentCount} subtitle="รวมทุกวิชา" icon={<Users className="w-5 h-5" />} variant="info" />
          <StatCard title="เช็คชื่อวันนี้" value={`${todayAttendance}/${myStudentCount}`} subtitle="มาเรียน" icon={<ClipboardCheck className="w-5 h-5" />} variant="success" />
          <StatCard title="เอกสารรอดำเนินการ" value={0} icon={<FileText className="w-5 h-5" />} variant="warning" />
        </div>

        {/* My subjects */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">รายวิชาที่รับผิดชอบ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mySubjects.map(subject => (
              <div key={subject.id} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">{subject.code} • {subject.credits} หน่วยกิต • {subject.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
