/**
 * components/ProtectedRoute.tsx
 * HOC pour proteger les routes necessitant authentification
 *
 * REGLE PRODUIT:
 * - Admin (role === 'admin' && tenantId === 'macrea') : acces complet
 * - Client (isProvisioned === false) : affiche CreateCrmGate, bloque acces CRM
 * - Client (isProvisioned === true) : acces normal au dashboard
 */

import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { LoadingSpinner } from './common/LoadingSpinner';
import { CreateCrmGate } from './CreateCrmGate';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, checkAuth, isLoading, user } = useAuthStore();

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

  // Determiner si l'utilisateur est admin MaCrea
  const isAdmin = user?.role === 'admin' && user?.tenantId === 'macrea';

  // REGLE: Si client (pas admin) et CRM non provisionne -> CreateCrmGate
  // Les admins ont toujours acces (pour la tour de controle)
  if (user && !isAdmin && user.isProvisioned === false) {
    return <CreateCrmGate />;
  }

  // Si authentifie (ou en cours de verification mais deja auth), render les routes enfants
  return <Outlet />;
};

export default ProtectedRoute;
