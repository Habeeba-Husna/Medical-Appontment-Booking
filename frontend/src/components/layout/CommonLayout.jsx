// import React from 'react';
// import { useAppSelector } from '../../hooks';
// import DashboardHeader from '../DashboardHeader';
// import DashboardSidebar from '../DashboardSidebar';
// import DoctorSidebar from '../doctorDashboard/DoctorSidebar'; 
// import { Outlet } from 'react-router-dom';

// const CommonLayout = () => {
//   const { user } = useAppSelector(state => state.auth);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar based on role */}
//       {user?.role === 'doctor' ? (
//         <DoctorSidebar isOpen={true} />
//       ) : (
//         <DashboardSidebar isOpen={true} />
//       )}

//       <div className="flex-1 flex flex-col">
//         <DashboardHeader toggleSidebar={() => {}} />
//         <main className="p-4 flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CommonLayout;
