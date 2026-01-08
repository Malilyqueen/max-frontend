/**
 * pages/ActivityDashboardPage.tsx
 * Dashboard d'activité multi-canal (Email, SMS, WhatsApp) - VERSION TEST
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ActivityDashboardPage() {
  const location = useLocation();

  useEffect(() => {
    console.log('✅ [ActivityDashboardPage] MOUNTED - Version:', new Date().toISOString());
    console.log('   Location pathname:', location.pathname);
    console.log('   Location search:', location.search);
    console.log('   Location state:', location.state);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-violet-50 p-8">
      <div className="bg-white rounded-xl p-12 shadow-2xl border-4 border-cyan-500">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 mb-6 text-center">
          🎯 PAGE ACTIVITÉ CHARGÉE ✅
        </h1>
        <div className="text-center">
          <p className="text-2xl text-gray-700 mb-4">
            ✨ Si tu vois ce message, c'est que la route <code className="bg-cyan-100 px-3 py-1 rounded text-cyan-700">/activite</code> fonctionne !
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Pathname actuel: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Version chargée: {new Date().toISOString()}
          </p>
        </div>
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-violet-50 rounded-xl border-2 border-cyan-200">
          <p className="text-lg text-center font-semibold text-gray-700 mb-4">
            📊 Dashboard multi-canal Email, SMS, WhatsApp
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl mb-2">📧</p>
              <p className="text-sm font-medium text-gray-700">Email</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl mb-2">📱</p>
              <p className="text-sm font-medium text-gray-700">SMS</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-sm font-medium text-gray-700">WhatsApp</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🔍 Ouvre la console (F12) pour voir les logs de débogage
          </p>
        </div>
      </div>
    </div>
  );
}