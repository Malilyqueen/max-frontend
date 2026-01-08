/**
 * pages/CampaignsPage.tsx
 * Page de gestion des campagnes bulk (Email, SMS, WhatsApp)
 */

import React, { useState } from 'react';
import { Send, Users, Zap, TrendingUp } from 'lucide-react';
import { SegmentBuilderModal } from '../components/campaigns/SegmentBuilderModal';
import { BulkSendModal } from '../components/campaigns/BulkSendModal';

interface SegmentCriteria {
  status?: string[];
  tags?: string[];
  source?: string;
  leadIds?: string[];
}

export function CampaignsPage() {
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [isBulkSendModalOpen, setIsBulkSendModalOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SegmentCriteria | null>(null);

  const handleSegmentConfirm = (segment: SegmentCriteria) => {
    setSelectedSegment(segment);
    setIsSegmentModalOpen(false);
    setIsBulkSendModalOpen(true);
  };

  const handleBulkSendSuccess = () => {
    // Refresh stats or show success message
    console.log('Campagne envoyée avec succès!');
  };

  const stats = [
    { label: 'Campagnes envoyées', value: '24', icon: Send, color: 'cyan' },
    { label: 'Leads touchés', value: '1,234', icon: Users, color: 'violet' },
    { label: 'Taux d\'ouverture', value: '68%', icon: TrendingUp, color: 'green' },
    { label: 'Taux de clic', value: '12%', icon: Zap, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Campagnes</h1>
              </div>
              <p className="text-gray-600 ml-15">
                Envoyez des campagnes ciblées par Email, SMS et WhatsApp
              </p>
            </div>

            <button
              onClick={() => setIsSegmentModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              Nouvelle campagne
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
                violet: { bg: 'bg-violet-100', text: 'text-violet-600' },
                green: { bg: 'bg-green-100', text: 'text-green-600' },
                orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
              };
              const colors = colorClasses[stat.color as keyof typeof colorClasses];

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Créer une campagne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email campaign */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsSegmentModalOpen(true)}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Campagne Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                Envoyez des emails personnalisés à un segment de leads.
              </p>
              <div className="flex items-center text-cyan-600 text-sm font-medium">
                Créer une campagne email →
              </div>
            </div>

            {/* WhatsApp campaign */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsSegmentModalOpen(true)}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Campagne WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contactez vos leads directement sur WhatsApp.
              </p>
              <div className="flex items-center text-cyan-600 text-sm font-medium">
                Créer une campagne WhatsApp →
              </div>
            </div>

            {/* SMS campaign */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsSegmentModalOpen(true)}>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Campagne SMS</h3>
              <p className="text-sm text-gray-600 mb-4">
                Envoyez des SMS en masse pour des notifications rapides.
              </p>
              <div className="flex items-center text-cyan-600 text-sm font-medium">
                Créer une campagne SMS →
              </div>
            </div>
          </div>
        </section>

        {/* Recent campaigns placeholder */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Campagnes récentes</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne</h3>
            <p className="text-sm text-gray-600 mb-4">
              Créez votre première campagne pour toucher vos leads.
            </p>
            <button
              onClick={() => setIsSegmentModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-violet-700 transition-all"
            >
              <Send className="w-5 h-5" />
              Créer ma première campagne
            </button>
          </div>
        </section>
      </div>

      {/* Modals */}
      <SegmentBuilderModal
        isOpen={isSegmentModalOpen}
        onClose={() => setIsSegmentModalOpen(false)}
        onConfirm={handleSegmentConfirm}
      />

      {selectedSegment && (
        <BulkSendModal
          isOpen={isBulkSendModalOpen}
          onClose={() => setIsBulkSendModalOpen(false)}
          segment={selectedSegment}
          onSuccess={handleBulkSendSuccess}
        />
      )}
    </div>
  );
}
