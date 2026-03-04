import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Download } from 'lucide-react';

const StudentDocuments = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">เอกสาร ปพ.</h1>
          <p className="text-muted-foreground text-sm mt-1">ระเบียนแสดงผลการเรียนของคุณ</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-12 shadow-card text-center">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">ยังไม่มีเอกสาร</h3>
          <p className="text-sm text-muted-foreground">เอกสาร ปพ. จะพร้อมให้ดาวน์โหลดเมื่ออาจารย์อัปโหลดเข้าสู่ระบบ</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDocuments;
