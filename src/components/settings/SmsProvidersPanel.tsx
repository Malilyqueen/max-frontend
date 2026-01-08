/**
 * Panel SMS Providers
 * Affiche Twilio SMS avec option de skip et formulaire de création
 */

import { useState } from 'react';
import { useProvidersStore } from '../../stores/useProvidersStore';
import { ChannelEmptyState } from './ChannelEmptyState';
import { ProviderForm } from './ProviderForm';
import { ProviderCard } from './ProviderCard';
import { getProvidersByChannel } from '../../types/providers';
import type { Provider } from '../../types/providers';
import { useToast } from '../../hooks/useToast';

export function SmsProvidersPanel() {
  const {
    providers,
    fetchProviders,
    isChannelSkipped,
    skipChannel,
    unskipChannel
  } = useProvidersStore();
  const toast = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | undefined>(undefined);

  const smsProviders = getProvidersByChannel(providers, 'sms');
  const hasProviders = smsProviders.length > 0;
  const isSkipped = isChannelSkipped('sms');

  // Callback après création/édition réussie
  const handleFormSuccess = async () => {
    await fetchProviders(); // Refresh la liste
    toast.success(editingProvider ? 'Provider modifié avec succès !' : 'Provider SMS créé avec succès !');
    setEditingProvider(undefined);
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider);
    setShowForm(true);
  };

  // État vide: montrer les options de configuration ou skip
  if (!hasProviders) {
    return (
      <>
        <ChannelEmptyState
          channel="sms"
          isSkipped={isSkipped}
          onConfigure={() => setShowForm(true)}
          onSkip={() => skipChannel('sms')}
          onUnskip={() => unskipChannel('sms')}
        />

        {/* Formulaire modal */}
        {showForm && (
          <ProviderForm
            providerType="twilio_sms"
            existingProvider={editingProvider}
            onClose={() => {
              setShowForm(false);
              setEditingProvider(undefined);
            }}
            onSuccess={handleFormSuccess}
          />
        )}
      </>
    );
  }

  // Afficher les ProviderCard pour chaque provider
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Vous avez {smsProviders.length} connexion{smsProviders.length > 1 ? 's' : ''} SMS configurée{smsProviders.length > 1 ? 's' : ''}.
        </p>
        <button
          onClick={() => {
            setEditingProvider(undefined);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          + Ajouter une connexion
        </button>
      </div>

      {/* Liste des providers */}
      {smsProviders.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onEdit={handleEdit}
        />
      ))}

      {/* Formulaire modal */}
      {showForm && (
        <ProviderForm
          providerType="twilio_sms"
          existingProvider={editingProvider}
          onClose={() => {
            setShowForm(false);
            setEditingProvider(undefined);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
