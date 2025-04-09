// import React, { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../dashboard/DashboardHeaders';
// import DashboardSidebar from '../dashboard/DashboardSidebar';
// import { useAppSelector } from '../../hooks/useAppSelector';

// const MainLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { user, isAuthenticated } = useAppSelector((state) => state.auth);
//   const navigate = useNavigate();

 

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       navigate('/login');
//     } else if (isAuthenticated === true) {
//       setLoading(false);
//     }
//   }, [isAuthenticated, navigate]);

  
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-100">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     navigate('/login');
//   //   }
//   // }, [isAuthenticated, navigate]);

//   const toggleSidebar = () => {
//     setSidebarOpen(prev => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DashboardSidebar isOpen={sidebarOpen} />

//       <div className="md:ml-64 flex flex-col min-h-screen">
//         <DashboardHeader toggleSidebar={toggleSidebar} />

//         <main className="flex-1 p-4 md:p-6 overflow-auto">
//           <Outlet />
//         </main>

//         <footer className="py-4 px-6 border-t text-center text-sm text-gray-500">
//           <p>© 2023 Health Harbor Connect. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;





import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from '../dashboard/DashboardHeaders';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import { useAppSelector } from '../../hooks/useAppSelector';
import Cookies from 'js-cookie'; // 👈 NEW import

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token'); // 👈 check cookie named "token"

    if (!token && isAuthenticated === false) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t text-center text-sm text-gray-500">
          <p>© 2023 Health Harbor Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
