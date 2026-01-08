/**
 * App.tsx
 * Point d'entrée de l'application avec routing
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShellSimple as AppShell } from './pages/AppShellSimple';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { CrmPage } from './pages/CrmPage';
import { AutomationPage } from './pages/AutomationPage';
import { ReportingPage } from './pages/ReportingPage';
import { MaxPage } from './pages/MaxPage';
import { ActivityDashboardPage } from './pages/ActivityDashboardPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToastContainer } from './components/Toast';
import { useToastStore } from './hooks/useToast';
import { useEffect } from 'react';

// Composant pour logger les redirections
function NavigateWithLog({ to, replace }: { to: string; replace?: boolean }) {
  const location = useLocation();

  useEffect(() => {
    console.log(`🔀 [REDIRECT] ${location.pathname} → ${to} (replace: ${replace})`);
  }, [location.pathname, to, replace]);

  return <Navigate to={to} replace={replace} />;
}

export default function App() {
  const { toasts, removeToast } = useToastStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppShell />}>
            {/* Redirect root vers dashboard */}
            <Route index element={<NavigateWithLog to="/dashboard" replace />} />

            {/* Pages principales MVP1 - Phase 1 complète */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/activite" element={<ActivityDashboardPage />} />
            <Route path="/campagnes" element={<CampaignsPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/reporting" element={<ReportingPage />} />
            <Route path="/max" element={<MaxPage />} />

            {/* Phase 2 - Settings */}
            <Route path="/settings/integrations" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NavigateWithLog to="/" replace />} />
      </Routes>

      {/* Toast notifications globales */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </BrowserRouter>
  );
}
