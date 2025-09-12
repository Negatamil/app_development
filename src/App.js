import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { useWebSocket } from './hooks/useWebSocket';

// Layout Components
import Layout from './components/Layout/Layout';
import AuthLayout from './components/Layout/AuthLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// User Pages
import Dashboard from './pages/User/Dashboard';
import BookingPage from './pages/User/BookingPage';
import BookingHistory from './pages/User/BookingHistory';
import PaymentPage from './pages/User/PaymentPage';
import Profile from './pages/User/Profile';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import SlotManagement from './pages/Admin/SlotManagement';
import FacilityManagement from './pages/Admin/FacilityManagement';
import AnalyticsDashboard from './pages/Admin/AnalyticsDashboard';

// Manager Pages
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import FacilityAnalytics from './pages/Manager/FacilityAnalytics';

// Security Pages
import SecurityDashboard from './pages/Security/SecurityDashboard';

// Protected Route Component
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Navigation Component for testing
import PageNavigator from './components/Navigation/PageNavigator';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);
  
  // Initialize WebSocket connection
  useWebSocket();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : 
          <AuthLayout><Login /></AuthLayout>
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : 
          <AuthLayout><Register /></AuthLayout>
        } />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* User Routes */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="profile" element={<Profile />} />

          {/* Admin Routes */}
          {role === 'ADMIN' && (
            <>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<UserManagement />} />
              <Route path="admin/slots" element={<SlotManagement />} />
              <Route path="admin/facilities" element={<FacilityManagement />} />
              <Route path="admin/analytics" element={<AnalyticsDashboard />} />
            </>
          )}

          {/* Manager Routes */}
          {role === 'MANAGER' && (
            <>
              <Route path="manager" element={<ManagerDashboard />} />
              <Route path="manager/analytics" element={<FacilityAnalytics />} />
            </>
          )}

          {/* Security Routes */}
          {role === 'SECURITY' && (
            <>
              <Route path="security" element={<SecurityDashboard />} />
            </>
          )}
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
