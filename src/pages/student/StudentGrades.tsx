import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockGrades, mockSubjects } from '@/data/mockData';

const StudentGrades = () => {
  const { user } = useAuth();
  // Strict: only show grades for auth user
  const myGrades = mockGrades.filter(g => g.studentId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ผลการเรียน</h1>
          <p className="text-muted-foreground text-sm mt-1">ผลการเรียนของคุณในภาคเรียนปัจจุบัน</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {myGrades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">รหัสวิชา</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ชื่อวิชา</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">กลางภาค (50)</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ปลายภาค (50)</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">งาน (20)</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">รวม</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">เกรด</th>
                  </tr>
                </thead>
                <tbody>
                  {myGrades.map(grade => {
                    const subject = mockSubjects.find(s => s.id === grade.subjectId);
                    return (
                      <tr key={grade.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-muted-foreground">{subject?.code}</td>
                        <td className="py-3 px-4 font-medium text-card-foreground">{subject?.name}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.midterm}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.final}</td>
                        <td className="text-center py-3 px-4 text-card-foreground">{grade.assignment}</td>
                        <td className="text-center py-3 px-4 font-bold text-card-foreground">{grade.total}</td>
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
            <div className="p-12 text-center text-muted-foreground">ยังไม่มีข้อมูลผลการเรียน</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGrades;
