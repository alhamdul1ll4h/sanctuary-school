import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import { Users, GraduationCap, BookOpen, FileText, UserCheck, AlertTriangle } from 'lucide-react';
import { mockUsers, mockSubjects, mockStudentProfiles, mockTeacherProfiles } from '@/data/mockData';

const AdminDashboard = () => {
  const totalStudents = mockStudentProfiles.length;
  const totalTeachers = mockTeacherProfiles.length;
  const totalSubjects = mockSubjects.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">แดชบอร์ดผู้ดูแลระบบ</h1>
          <p className="text-muted-foreground text-sm mt-1">ภาพรวมระบบบริหารจัดการโรงเรียน</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="นักเรียนทั้งหมด" value={totalStudents} subtitle="ปีการศึกษา 2568" icon={<GraduationCap className="w-5 h-5" />} variant="gold" />
          <StatCard title="บุคลากร" value={totalTeachers} subtitle="ครูและเจ้าหน้าที่" icon={<Users className="w-5 h-5" />} variant="info" />
          <StatCard title="รายวิชาทั้งหมด" value={totalSubjects} subtitle="เปิดสอนในเทอมนี้" icon={<BookOpen className="w-5 h-5" />} variant="success" />
          <StatCard title="เอกสาร ปพ." value={0} subtitle="รอดำเนินการ" icon={<FileText className="w-5 h-5" />} variant="warning" />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">การดำเนินการด่วน</h2>
            <div className="space-y-3">
              {[
                { icon: <UserCheck className="w-4 h-4" />, text: 'เพิ่มนักเรียนใหม่', desc: 'ลงทะเบียนนักเรียนเข้าสู่ระบบ' },
                { icon: <Users className="w-4 h-4" />, text: 'เพิ่มบุคลากร', desc: 'เพิ่มครูหรือเจ้าหน้าที่ใหม่' },
                { icon: <BookOpen className="w-4 h-4" />, text: 'เปิดรายวิชาใหม่', desc: 'สร้างรายวิชาสำหรับเทอมนี้' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">สถานะระบบ</h2>
            <div className="space-y-4">
              {[
                { label: 'ฐานข้อมูล', status: 'ปกติ', color: 'bg-success' },
                { label: 'ระบบยืนยันตัวตน', status: 'ปกติ', color: 'bg-success' },
                { label: 'พื้นที่จัดเก็บ', status: 'ใช้ไป 23%', color: 'bg-info' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground">{item.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full text-primary-foreground ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
