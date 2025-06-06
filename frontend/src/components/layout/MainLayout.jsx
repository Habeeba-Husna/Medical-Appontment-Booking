// import React, { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../patient/dashboard/DashboardHeaders';
// import DashboardSidebar from '../patient/dashboard/DashboardSidebar';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import Cookies from 'js-cookie'; 

// const MainLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get('token'); 

//     if (!token && isAuthenticated === false) {
//       navigate('/login');
//     } else {
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

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev);
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
//           <p>© 2025 Health Harbor Connect. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;



import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../store/slices/authSlice';
import Cookies from 'js-cookie';
import DashboardHeader from '../patient/dashboard/DashboardHeaders';
import DashboardSidebar from '../patient/dashboard/DashboardSidebar';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (token && !isAuthenticated) {
      dispatch(fetchCurrentUser());
    } else if (!token) {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
        
        <footer className="py-4 px-6 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} HealWise. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;