import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import DoctorSidebar from '../components/doctorDashboard/DoctorSidebar';
import DashboardHeader from '../components/patient/dashboard/DashboardHeaders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import DoctorQuickActions from '../components/doctorDashboard/DoctorQuickActions';
import DoctorUpcomingAppointments from '../components/doctorDashboard/DoctorUpcomingAppointments';
import RecentPatientsPage from '../components/doctorDashboard/RecentPatientsPage';
import AvailabilityPage from '../components/doctorDashboard/AvailabilityPage';

const DoctorDashboardPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar isOpen={sidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">

      <main className="px-6 py-4 md:px-8 overflow-y-auto">
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {user?.name || 'Doctor'}</h1>
      <p className="text-gray-500">Manage your appointments, consultations, and reports from your dashboard.</p>
    </div>

    <DoctorQuickActions />
    <DoctorUpcomingAppointments />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RecentPatientsPage />
      <AvailabilityPage />
    </div>
  </div>
</main>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;




  {/* <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Medical News</CardTitle>
                    <CardDescription>Latest updates from the medical world</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">Telemedicine Guidelines</h3>
                      <p className="text-sm text-gray-600">Stay up to date with telehealth regulations and best practices.</p>
                    </div>
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">New Treatments</h3>
                      <p className="text-sm text-gray-600">Explore the latest research in chronic illness management.</p>
                    </div>
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">Mental Health Trends</h3>
                      <p className="text-sm text-gray-600">Track trends in anxiety, depression, and patient recovery strategies.</p>
                    </div>
                  </CardContent>
                </Card>
              </div> */}

              

  





//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full">
//         <DoctorSidebar />
//         <SidebarInset>
//           <div className="flex flex-col min-h-screen">
//             {/* Header */}
//             <header className="bg-background border-b border-border px-6 py-4 flex items-center">
//               <SidebarTrigger className="mr-4" />
//               <div>
//                 <h1 className="font-bold text-2xl">Doctor Dashboard</h1>
//                 <p className="text-muted-foreground">Welcome back, {doctor?.name}</p>
//               </div>
//               <div className="ml-auto flex items-center space-x-4">
//                 <Button variant="ghost" size="icon" className="relative">
//                   <Bell className="h-5 w-5" />
//                   <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">5</div>
//                 </Button>
//                 <Avatar>
//                   <AvatarImage src={doctor?.profileImage} />
//                   <AvatarFallback className="bg-primary text-primary-foreground">
//                     {doctor?.name?.charAt(0) || 'D'}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//             </header>
//           </div>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   );
// }
