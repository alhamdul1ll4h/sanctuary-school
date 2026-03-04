import DashboardLayout from '@/components/layout/DashboardLayout';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-12 shadow-card text-center">
        <Construction className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">กำลังพัฒนา</h3>
        <p className="text-sm text-muted-foreground">ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา</p>
      </div>
    </div>
  </DashboardLayout>
);

export default PlaceholderPage;
