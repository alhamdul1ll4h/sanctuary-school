import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockExamSchedules, mockSubjects } from '@/data/mockData';

const StudentExams = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ตารางสอบ</h1>
          <p className="text-muted-foreground text-sm mt-1">ตารางการสอบประจำภาคเรียน</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockExamSchedules.map(exam => {
            const subject = mockSubjects.find(s => s.id === exam.subjectId);
            return (
              <div key={exam.id} className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-navy flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary-foreground">{exam.date.split('-')[2]}</span>
                    <span className="text-[10px] text-primary-foreground/70">ก.พ.</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{subject?.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{subject?.code} • {subject?.credits} หน่วยกิต</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-info/10 text-info">
                        {exam.examType === 'midterm' ? 'กลางภาค' : 'ปลายภาค'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                        {exam.startTime} - {exam.endTime}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                        {exam.room}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentExams;
