//converted

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CalendarDays, 
  Home,
  Stethoscope,
  FileText,
  Clock,
  UserCircle
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SidebarLink({ href, icon, title, isActive }) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-secondary",
        isActive && "bg-medical-light text-medical-secondary font-medium"
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}

function DashboardSidebar({ isOpen }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:translate-x-0"
    )}>
      <div className="px-3 py-4">
        <div className="mb-8 flex items-center justify-center">
          <Link to="/dashboard1" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-medical-secondary">
              HealthHarbor
            </span>
          </Link>
        </div>

        <nav className="space-y-1 px-2">
          <SidebarLink
            href="/dashboard1"
            icon={<Home className="h-5 w-5" />}
            title="Dashboard"
            isActive={isActive('/dashboard1')}
          />
          <SidebarLink
            href="/doctors"
            icon={<Stethoscope className="h-5 w-5" />}
            title="Find Doctors"
            isActive={isActive('/doctors')}
          />
          <SidebarLink
            href="/appointments"
            icon={<CalendarDays className="h-5 w-5" />}
            title="Appointments"
            isActive={isActive('/appointments')}
          />
          <SidebarLink
            href="/medical-records"
            icon={<FileText className="h-5 w-5" />}
            title="Medical Records"
            isActive={isActive('/medical-records')}
          />
          <SidebarLink
            href="/appointment-history"
            icon={<Clock className="h-5 w-5" />}
            title="History"
            isActive={isActive('/appointment-history')}
          />
          <SidebarLink
            href="/profile"
            icon={<UserCircle className="h-5 w-5" />}
            title="Profile"
            isActive={isActive('/profile')}
          />
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
