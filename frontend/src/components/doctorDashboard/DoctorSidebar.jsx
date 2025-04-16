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







// import { useNavigate } from "react-router-dom";
// import {
//   Calendar,
//   ClipboardList,
//   FileText,
//   Home,
//   LogOut,
//   MessageCircle,
//   Settings,
//   Users,
//   Bell,
//   CreditCard,
//   Star,
//   BookOpen,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useAuth } from "@/contexts/auth-context";
// import { Doctor } from "@/lib/types";

// export function DoctorSidebar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const doctor = user as Doctor;

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const menuItems = [
//     { icon: Home, title: "Dashboard", path: "/doctor-dashboard" },
//     { icon: Calendar, title: "Appointments", path: "/doctor-dashboard/appointments" },
//     { icon: MessageCircle, title: "Consultations", path: "/doctor-dashboard/consultations" },
//     { icon: Users, title: "Patients", path: "/doctor-dashboard/patients" },
//     { icon: FileText, title: "Prescriptions", path: "/doctor-dashboard/prescriptions" },
//     { icon: BookOpen, title: "Medical Records", path: "/doctor-dashboard/records" },
//     { icon: CreditCard, title: "Payments", path: "/doctor-dashboard/payments" },
//     { icon: Bell, title: "Notifications", path: "/doctor-dashboard/notifications" },
//     { icon: Settings, title: "Settings", path: "/doctor-dashboard/settings" },
//   ];

//   return (
//     <Sidebar>
//       <SidebarHeader className="flex flex-col items-center justify-center py-4 border-b border-sidebar-border">
//         <Avatar className="h-16 w-16 mb-2">
//           <AvatarImage src={doctor?.profileImage} />
//           <AvatarFallback className="bg-primary text-primary-foreground">
//             {doctor?.name?.charAt(0) || 'D'}
//           </AvatarFallback>
//         </Avatar>
//         <div className="text-center">
//           <h3 className="font-medium">{doctor?.name}</h3>
//           <p className="text-xs text-muted-foreground">{doctor?.specialization}</p>
//           <div className="flex items-center justify-center gap-1 mt-1">
//             <Star className="fill-warning text-warning h-3 w-3" />
//             <span className="text-xs">{doctor?.rating || 5.0}</span>
//           </div>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.path}>
//                   <SidebarMenuButton 
//                     asChild
//                     tooltip={item.title}
//                   >
//                     <a 
//                       href={item.path}
//                       className="flex items-center gap-3"
//                     >
//                       <item.icon className="size-4" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="border-t border-sidebar-border p-4">
//         <Button 
//           variant="outline" 
//           className="w-full flex items-center gap-2" 
//           onClick={handleLogout}
//         >
//           <LogOut className="size-4" />
//           <span>Sign Out</span>
//         </Button>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
