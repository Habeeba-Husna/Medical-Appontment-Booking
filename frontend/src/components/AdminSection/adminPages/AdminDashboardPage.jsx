// import React, { useState } from 'react';
// import { useAppSelector } from '../../../hooks/useAppSelector';
// import DoctorSidebar from '../../../components/doctorDashboard/DoctorSidebar';
// import AdminQuickActions from './dashboard/AdminQuickActions';
// import DoctorApprovals from './dashboard/DoctorApprovals';
// import AnalyticsSummary from './dashboard/AnalyticsSummary';
// import UserManagement from './dashboard/UserManagement';
// import {Card} from "../../ui/Card";

// const AdminDoctorDashboardPage = () => {
//   const { user } = useAppSelector(state => state.auth);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50">
//      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//     <div className="flex-1 flex flex-col overflow-hidden">
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-6 space-y-6">
//         {/* Welcome Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome, Dr. {user?.name || 'Admin'}</h1>
//           <p className="text-gray-600 mt-2">
//             Manage your platform, users, and analytics from your dashboard.
//           </p>
//         </div>

//     {/* Quick Actions */}
   
//             <AdminQuickActions />
        

//           {/* Approvals & Analytics */}
//           <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <DoctorApprovals />
//             </Card>
//             <Card>
//               <AnalyticsSummary />
//             </Card>
//           </section>

//           {/* User Management */}
//           <section>
//             <Card>
//               <UserManagement />
//             </Card>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDoctorDashboardPage;




import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import DoctorSidebar from '../../../components/doctorDashboard/DoctorSidebar';
import AdminQuickActions from './dashboard/AdminQuickActions';
import DoctorApprovals from './dashboard/DoctorApprovals';
import AnalyticsSummary from './dashboard/AnalyticsSummary';
import UserManagement from './dashboard/UserManagement';
import { Card } from "../../ui/Card";

const AdminDoctorDashboardPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Welcome Header */}
          <header className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, Dr. {user?.name || 'Admin'}</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Manage your platform, users, and analytics from your dashboard.
            </p>
          </header>

          {/* Quick Actions */}
          <section className="mb-4 sm:mb-6">
            <AdminQuickActions />
          </section>

          {/* Approvals & Analytics */}
          {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6"> */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-2 sm:mb-3">
            {/* <Card className="overflow-hidden"> */}
            <Card className="overflow-hidden lg:col-span-2">
              <DoctorApprovals />
            </Card>
            {/* <Card className="overflow-hidden"> */}
            <Card className="overflow-hidden lg:col-span-1">
              <AnalyticsSummary />
            </Card>
          </section>

          {/* User Management */}
          <section className="mb-2 sm:mb-4">
            <Card className="overflow-hidden">
              <UserManagement />
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDoctorDashboardPage;


  
    // <SidebarProvider>
    //   <div className="flex min-h-screen w-full">
    //     <AdminSidebar />
    //     <SidebarInset>
    //       <div className="flex flex-col min-h-screen">
    //         {/* Header */}
    //         <header className="bg-background border-b border-border px-6 py-4 flex items-center">
    //           <SidebarTrigger className="mr-4" />
    //           <div>
    //             <h1 className="font-bold text-2xl">Admin Dashboard</h1>
    //             <p className="text-muted-foreground">System overview and management</p>
    //           </div>
    //           <div className="ml-auto flex items-center space-x-4">
    //             <Button variant="ghost" size="icon" className="relative">
    //               <Bell className="h-5 w-5" />
    //               <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">7</div>
    //             </Button>
    //             <Avatar>
    //               <AvatarImage src={admin?.profileImage} />
    //               <AvatarFallback className="bg-primary text-primary-foreground">
    //                 {admin?.name?.charAt(0) || 'A'}
    //               </AvatarFallback>
    //             </Avatar>
    //           </div>
    //         </header>
    //         </main>
    //       </div>
    //     </SidebarInset>
    //   </div>
    // </SidebarProvider>
  

        

                              
          
            

