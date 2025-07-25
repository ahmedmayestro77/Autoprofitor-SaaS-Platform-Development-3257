import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;