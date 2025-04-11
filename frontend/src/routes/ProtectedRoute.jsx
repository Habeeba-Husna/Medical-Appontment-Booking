
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = Cookies.get('userRole');

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect to login/home
  }

  return children;
};

export default ProtectedRoute;
