/**
 * components/chat/TokenDisplay.tsx
 * Affichage du compteur de tokens - Chat M.A.X. MVP1
 */

import React from 'react';

interface TokenDisplayProps {
  totalTokens: number;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ totalTokens }) => {
  // Format avec espaces de milliers
  const formatTokens = (count: number): string => {
    return count.toLocaleString('fr-FR');
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <span>
        <span className="font-medium">{formatTokens(totalTokens)}</span> tokens utilisés
      </span>
    </div>
  );
};
