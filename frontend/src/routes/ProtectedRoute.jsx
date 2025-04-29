// ProtectedRoute.jsx
// import { useAppSelector } from '../hooks'; // Make sure this path is correct
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    const token = Cookies.get('token');

    // If no token and not authenticated, redirect to login
    if (!token && !isAuthenticated) {
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
    }

    // Wait until user.role is available before checking role
    if (isAuthenticated && user?.role && allowedRoles && !allowedRoles.includes(user.role)) {
      navigate('/unauthorized', { replace: true });
    }
  }, [isAuthenticated, user?.role, navigate, location, allowedRoles]);

  // Wait until role is known before rendering
  if (!user?.role && isAuthenticated) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(user?.role))) {
    return children;
  }

  return null;
};
export default ProtectedRoute;