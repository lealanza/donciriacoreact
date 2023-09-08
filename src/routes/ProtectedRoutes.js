import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const token = useSelector(state => state.user.token);
  return isAuthenticated && token ? children : <Navigate to='/login' />;
  
};

export default ProtectedRoute;
