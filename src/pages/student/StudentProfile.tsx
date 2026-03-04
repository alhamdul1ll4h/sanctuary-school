import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudentProfiles } from '@/data/mockData';

const StudentProfile = () => {
  const { user } = useAuth();
  const profile = mockStudentProfiles.find(s => s.userId === user?.id);

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center text-muted-foreground">ไม่พบข้อมูลส่วนตัว</div>
      </DashboardLayout>
    );
  }

  const fields = [
    { label: 'รหัสนักเรียน', value: profile.studentCode },
    { label: 'ชื่อ-นามสกุล', value: `${profile.firstName} ${profile.lastName}` },
    { label: 'ชั้นเรียน', value: profile.classroom },
    { label: 'ระดับชั้น', value: profile.level },
    { label: 'วันเกิด', value: profile.dateOfBirth },
    { label: 'ผู้ปกครอง', value: profile.parentName },
    { label: 'เบอร์โทรผู้ปกครอง', value: profile.parentPhone },
    { label: 'อีเมล', value: user?.email || '-' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ข้อมูลส่วนตัว</h1>
          <p className="text-muted-foreground text-sm mt-1">ข้อมูลส่วนตัวของนักเรียน</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="gradient-navy p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center">
              <span className="text-xl font-bold text-accent-foreground">{profile.firstName.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">{profile.firstName} {profile.lastName}</h2>
              <p className="text-primary-foreground/70 text-sm">{profile.classroom} • {profile.studentCode}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(field => (
                <div key={field.label} className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                  <p className="text-sm text-card-foreground font-medium bg-secondary rounded-lg px-3 py-2">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
