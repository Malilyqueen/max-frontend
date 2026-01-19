/**
 * pages/CrmSetupPage.tsx
 * Page affichee pour les nouveaux tenants dont le CRM n'est pas encore configure
 * Affiche un message d'accueil et les etapes de configuration
 */

import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Settings, CheckCircle, Clock, Mail } from 'lucide-react';

export const CrmSetupPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Settings className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bienvenue sur M.A.X. CRM, {user?.name} !
            </h1>
            <p className="text-gray-600">
              Votre espace <strong>{user?.tenantName || user?.tenantId}</strong> est en cours de configuration.
            </p>
          </div>

          {/* Etapes */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Prochaines etapes</h2>

            {/* Etape 1 - Compte cree */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Compte cree</h3>
                <p className="text-sm text-green-700">
                  Votre compte et votre espace entreprise ont ete crees avec succes.
                </p>
              </div>
            </div>

            {/* Etape 2 - Configuration CRM */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '3s' }} />
              <div>
                <h3 className="font-medium text-blue-800">Configuration CRM en cours</h3>
                <p className="text-sm text-blue-700">
                  Notre equipe configure votre espace CRM personnalise.
                  Vous recevrez un email lorsque tout sera pret.
                </p>
              </div>
            </div>

            {/* Etape 3 - Paiement */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-600">Configuration du paiement</h3>
                <p className="text-sm text-gray-500">
                  Un conseiller vous contactera pour finaliser votre abonnement.
                </p>
              </div>
            </div>
          </div>

          {/* Info plan */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-8">
            <h3 className="font-semibold mb-2">Votre formule : {user?.plan === 'starter_whatsapp' ? 'Starter + WhatsApp' : 'Starter'}</h3>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>&#10003; CRM complet avec gestion des leads</li>
              <li>&#10003; Email et SMS integres</li>
              <li>&#10003; Campagnes marketing</li>
              {user?.plan === 'starter_whatsapp' && (
                <li>&#10003; WhatsApp Pro (100 messages/mois inclus)</li>
              )}
            </ul>
          </div>

          {/* Contact support */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Des questions ? Notre equipe est la pour vous aider.
            </p>
            <a
              href="mailto:support@macrea.fr"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@macrea.fr
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>M.A.X. CRM - MaCrea 2025</p>
        </div>
      </div>
    </div>
  );
};

export default CrmSetupPage;