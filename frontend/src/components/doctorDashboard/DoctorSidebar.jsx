import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Home, Stethoscope, FileText, Clock, UserCircle } from 'lucide-react';
import cn from 'classnames';
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

const DoctorSidebar = ({ isOpen }) => {
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
          <Link to="/doctor-dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-medical-secondary">
              HealthHarbor
            </span>
          </Link>
        </div>

        <nav className="space-y-1 px-2">
          <SidebarLink
            href="/doctor-dashboard"
            icon={<Home className="h-5 w-5" />}
            title="Dashboard"
            isActive={isActive('/doctor-dashboard')}
          />
          <SidebarLink
            href="/doctor-appointments"
            icon={<CalendarDays className="h-5 w-5" />}
            title="My Appointments"
            isActive={isActive('/doctor-appointments')}
          />
          <SidebarLink
            href="/doctor-consultations"
            icon={<Stethoscope className="h-5 w-5" />}
            title="Consultations"
            isActive={isActive('/doctor-consultations')}
          />
          <SidebarLink
            href="/doctor-reports"
            icon={<FileText className="h-5 w-5" />}
            title="Reports"
            isActive={isActive('/doctor-reports')}
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
};

export default DoctorSidebar;
