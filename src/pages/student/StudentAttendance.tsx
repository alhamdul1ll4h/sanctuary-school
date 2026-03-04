import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockAttendance, mockSubjects } from '@/data/mockData';

const statusLabels: Record<string, { text: string; className: string }> = {
  present: { text: 'มาเรียน', className: 'bg-success/10 text-success' },
  late: { text: 'สาย', className: 'bg-warning/10 text-warning' },
  leave: { text: 'ลา', className: 'bg-info/10 text-info' },
  absent: { text: 'ขาด', className: 'bg-destructive/10 text-destructive' },
};

const StudentAttendance = () => {
  const { user } = useAuth();
  const myAttendance = mockAttendance.filter(a => a.studentId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">สถานะการเข้าเรียน</h1>
          <p className="text-muted-foreground text-sm mt-1">ประวัติการเข้าเรียนของคุณ</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {myAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">วันที่</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">วิชา</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">สถานะ</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {myAttendance.map(record => {
                    const subject = mockSubjects.find(s => s.id === record.subjectId);
                    const status = statusLabels[record.status];
                    return (
                      <tr key={record.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-card-foreground">{record.date}</td>
                        <td className="py-3 px-4 font-medium text-card-foreground">{subject?.name}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{record.note || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground">ยังไม่มีข้อมูลการเข้าเรียน</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
