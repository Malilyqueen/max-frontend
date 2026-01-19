/**
 * components/ProtectedRoute.tsx
 * HOC pour proteger les routes necessitant authentification
 * Redirige vers CrmSetupPage si tenant non provisionne
 */

import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { LoadingSpinner } from './common/LoadingSpinner';
import { CrmSetupPage } from '../pages/CrmSetupPage';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, checkAuth, isLoading, user } = useAuthStore();
  const location = useLocation();

  // Verifier l'auth SEULEMENT au mount initial (pas a chaque navigation)
  useEffect(() => {
    // Ne checker que si pas deja authentifie
    if (!isAuthenticated) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vide = seulement au mount

  // Loading state SEULEMENT si on n'est pas encore authentifie
  // Si deja authentifie, on laisse naviguer meme pendant le refresh du token
  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Verification de l'authentification..." />
      </div>
    );
  }

  // Si pas authentifie ET pas en train de charger, rediriger vers login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  // Si authentifie MAIS tenant non provisionne, afficher page de setup
  // Exception: permettre l'acces a /settings pour configurer
  if (user && user.isProvisioned === false && !location.pathname.startsWith('/settings')) {
    return <CrmSetupPage />;
  }

  // Si authentifie (ou en cours de verification mais deja auth), render les routes enfants
  return <Outlet />;
};

export default ProtectedRoute;
