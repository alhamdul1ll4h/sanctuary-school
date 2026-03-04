import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import { BookOpen, ClipboardCheck, Calendar, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockGrades, mockAttendance, mockExamSchedules, mockStudentProfiles, mockSubjects } from '@/data/mockData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const profile = mockStudentProfiles.find(s => s.userId === user?.id);
  const myGrades = mockGrades.filter(g => g.studentId === user?.id);
  const myAttendance = mockAttendance.filter(a => a.studentId === user?.id);
  const presentCount = myAttendance.filter(a => a.status === 'present').length;
  const avgGrade = myGrades.length > 0 ? (myGrades.reduce((sum, g) => sum + g.total, 0) / myGrades.length).toFixed(1) : '-';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            สวัสดี, {profile ? `${profile.firstName} ${profile.lastName}` : user?.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {profile ? `${profile.classroom} • รหัส ${profile.studentCode}` : 'นักเรียน'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="เกรดเฉลี่ย" value={avgGrade} subtitle="ภาคเรียนที่ 1" icon={<BookOpen className="w-5 h-5" />} variant="gold" />
          <StatCard title="อัตราการเข้าเรียน" value={myAttendance.length > 0 ? `${Math.round(presentCount / myAttendance.length * 100)}%` : '-'} subtitle={`มา ${presentCount}/${myAttendance.length} ครั้ง`} icon={<ClipboardCheck className="w-5 h-5" />} variant="success" />
          <StatCard title="สอบที่กำลังจะถึง" value={mockExamSchedules.length} subtitle="กลางภาค" icon={<Calendar className="w-5 h-5" />} variant="info" />
          <StatCard title="เอกสาร ปพ." value={0} subtitle="พร้อมดาวน์โหลด" icon={<FileText className="w-5 h-5" />} variant="warning" />
        </div>

        {/* Recent grades */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">ผลการเรียนล่าสุด</h2>
          {myGrades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">รายวิชา</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">กลางภาค</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ปลายภาค</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">งาน</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">รวม</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">เกรด</th>
                  </tr>
                </thead>
                <tbody>
                  {myGrades.map(grade => {
                    const subject = mockSubjects.find(s => s.id === grade.subjectId);
                    return (
                      <tr key={grade.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-card-foreground">{subject?.name || '-'}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.midterm}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.final}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.assignment}</td>
                        <td className="text-center py-3 px-4 font-semibold text-card-foreground">{grade.total}</td>
                        <td className="text-center py-3 px-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full gradient-gold text-accent-foreground font-bold text-xs">
                            {grade.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">ยังไม่มีข้อมูลผลการเรียน</p>
          )}
        </div>

        {/* Upcoming exams */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">ตารางสอบที่กำลังจะถึง</h2>
          <div className="space-y-3">
            {mockExamSchedules.map(exam => {
              const subject = mockSubjects.find(s => s.id === exam.subjectId);
              return (
                <div key={exam.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-lg bg-info/10 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-info">{exam.date.split('-')[2]}</span>
                    <span className="text-[10px] text-info/70">ก.พ.</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{subject?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exam.examType === 'midterm' ? 'สอบกลางภาค' : 'สอบปลายภาค'} • {exam.startTime}-{exam.endTime} • {exam.room}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
