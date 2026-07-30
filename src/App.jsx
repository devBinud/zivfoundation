/* App - Routing & Layout Setup */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './public.css';

// Scroll To Top On Route Change Component
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
};

// Admin Components & Pages
import Sidebar from './admin/components/Sidebar/Sidebar';
import Header from './admin/components/Header/Header';

import Login from './admin/pages/Login/Login';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import UserDirectory from './admin/pages/UserDirectory/UserDirectory';
import UserDetail from './admin/pages/UserDetail/UserDetail';
import PartnerDirectory from './admin/pages/PartnerDirectory/PartnerDirectory';
import AddOrganization from './admin/pages/AddOrganization/AddOrganization';
import RequestModeration from './admin/pages/RequestModeration/RequestModeration';
import FlaggedReviews from './admin/pages/FlaggedReviews/FlaggedReviews';
import OnBehalfCreation from './admin/pages/OnBehalfCreation/OnBehalfCreation';
import CertificateManagement from './admin/pages/CertificateManagement/CertificateManagement';
import ViewCertificate from './admin/pages/ViewCertificate/ViewCertificate';
import BroadcastPanel from './admin/pages/BroadcastPanel/BroadcastPanel';
import PushNotifications from './admin/pages/PushNotifications/PushNotifications';
import SystemSettings from './admin/pages/SystemSettings/SystemSettings';
import OrgTypeMaster from './admin/pages/OrgTypeMaster/OrgTypeMaster';
import HelpCenter from './admin/pages/HelpCenter/HelpCenter';
import DonationHistory from './admin/pages/DonationHistory/DonationHistory';

// Public Layout & Pages
import PublicLayout from './public/layouts/PublicLayout';
import PublicHome from './public/pages/PublicHome/PublicHome';
import PublicAbout from './public/pages/PublicAbout/PublicAbout';
import PublicContact from './public/pages/PublicContact/PublicContact';
import PublicRegister from './public/pages/PublicRegister/PublicRegister';
import PublicLogin from './public/pages/PublicLogin/PublicLogin';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Main Admin Layout Wrapper
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`admin-layout ${sidebarOpen ? 'sidebar-active' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} setTheme={setTheme} />
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}
      <div className="main-content">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} theme={theme} setTheme={setTheme} />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path="about" element={<PublicAbout />} />
          <Route path="contact" element={<PublicContact />} />
          <Route path="register" element={<PublicRegister />} />
          <Route path="login" element={<PublicLogin />} />
        </Route>

        {/* Dedicated Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Panel Routes under /admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserDirectory />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="partners" element={<PartnerDirectory />} />
          <Route path="partners/add" element={<AddOrganization />} />
          <Route path="requests" element={<RequestModeration />} />
          <Route path="flagged-reviews" element={<FlaggedReviews />} />
          <Route path="on-behalf" element={<OnBehalfCreation />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="certificates/view/:id" element={<ViewCertificate />} />
          <Route path="certificates/history/:id" element={<DonationHistory />} />
          <Route path="broadcasts" element={<BroadcastPanel />} />
          <Route path="push-notifications" element={<PushNotifications />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="masters/org-types" element={<OrgTypeMaster />} />
          <Route path="help-center" element={<HelpCenter />} />
        </Route>

        {/* Fallback to Public Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
