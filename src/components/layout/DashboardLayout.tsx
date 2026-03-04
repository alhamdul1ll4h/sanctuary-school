import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, ROLE_LABELS } from '@/types/school';
import {
  GraduationCap, LayoutDashboard, Users, BookOpen, ClipboardCheck,
  Calendar, FileText, Settings, LogOut, ChevronLeft, Menu, User
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { label: 'แดชบอร์ด', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'จัดการบุคลากร', path: '/admin/staff', icon: <Users className="w-5 h-5" /> },
    { label: 'จัดการนักเรียน', path: '/admin/students', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'จัดการรายวิชา', path: '/admin/subjects', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'ตารางสอบ', path: '/admin/exams', icon: <Calendar className="w-5 h-5" /> },
    { label: 'คลังเอกสาร ปพ.', path: '/admin/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'ตั้งค่าระบบ', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ],
  teacher: [
    { label: 'แดชบอร์ด', path: '/teacher', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'รายวิชาของฉัน', path: '/teacher/subjects', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'บันทึกคะแนน', path: '/teacher/grades', icon: <ClipboardCheck className="w-5 h-5" /> },
    { label: 'เช็คชื่อเข้าเรียน', path: '/teacher/attendance', icon: <Calendar className="w-5 h-5" /> },
    { label: 'อัปโหลดเอกสาร ปพ.', path: '/teacher/documents', icon: <FileText className="w-5 h-5" /> },
  ],
  student: [
    { label: 'แดชบอร์ด', path: '/student', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'ผลการเรียน', path: '/student/grades', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'สถานะการเข้าเรียน', path: '/student/attendance', icon: <ClipboardCheck className="w-5 h-5" /> },
    { label: 'ตารางสอบ', path: '/student/exams', icon: <Calendar className="w-5 h-5" /> },
    { label: 'เอกสาร ปพ.', path: '/student/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'ข้อมูลส่วนตัว', path: '/student/profile', icon: <User className="w-5 h-5" /> },
  ],
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const navItems = roleNavItems[user.role];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-accent-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold text-sidebar-foreground">วิทยาคาร</h1>
            <p className="text-xs text-sidebar-foreground/50">{ROLE_LABELS[user.role]}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/admin` || item.path === `/teacher` || item.path === `/student`}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="border-t border-sidebar-border p-3">
        <div className={`flex items-center gap-3 px-3 py-2 mb-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-accent-foreground">{user.name.charAt(0)}</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50">{user.username}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar shadow-sidebar transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-sidebar shadow-sidebar transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-secondary transition-colors z-10"
        >
          <ChevronLeft className={`w-3 h-3 text-foreground transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-card border-b border-border">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>ปีการศึกษา 2568</span>
            <span className="text-border">|</span>
            <span>ภาคเรียนที่ 1</span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
