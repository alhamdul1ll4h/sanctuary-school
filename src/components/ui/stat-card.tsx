import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  variant?: 'default' | 'gold' | 'success' | 'info' | 'warning';
}

const variantStyles = {
  default: 'bg-card border-border',
  gold: 'bg-card border-accent/30',
  success: 'bg-card border-success/30',
  info: 'bg-card border-info/30',
  warning: 'bg-card border-warning/30',
};

const iconStyles = {
  default: 'bg-secondary text-foreground',
  gold: 'gradient-gold text-accent-foreground',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
};

const StatCard = ({ title, value, subtitle, icon, variant = 'default' }: StatCardProps) => (
  <div className={`rounded-xl border p-5 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in ${variantStyles[variant]}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconStyles[variant]}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
