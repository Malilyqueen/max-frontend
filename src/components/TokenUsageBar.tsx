/**
 * components/TokenUsageBar.tsx
 * Barre d'utilisation des tokens API
 */

import React from 'react';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useThemeColors } from '../hooks/useThemeColors';

interface TokenUsageBarProps {
  compact?: boolean;
}

export function TokenUsageBar({ compact = false }: TokenUsageBarProps) {
  const { tokenUsage } = useSettingsStore();
  const themeColors = useThemeColors();

  const getBarColor = () => {
    if (tokenUsage.percentage >= 90) return 'bg-red-600';
    if (tokenUsage.percentage >= 70) return 'bg-orange-500';
    if (tokenUsage.percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-600';
  };

  const getTextColor = () => {
    if (tokenUsage.percentage >= 90) return 'text-red-600';
    if (tokenUsage.percentage >= 70) return 'text-orange-600';
    if (tokenUsage.percentage >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 min-w-[180px]">
        <div
          className="flex-1 h-2 rounded-full overflow-hidden"
          style={{
            background: 'rgba(148, 163, 184, 0.2)'
          }}
        >
          <div
            className={`h-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${tokenUsage.percentage}%` }}
          />
        </div>
        <span className={`text-xs font-semibold ${getTextColor()}`}>
          {tokenUsage.percentage.toFixed(1)}%
        </span>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border p-4"
      style={{
        background: themeColors.cardBg,
        borderColor: themeColors.border
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: themeColors.textSecondary }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-sm font-semibold" style={{ color: themeColors.textPrimary }}>Tokens API</span>
        </div>
        <span className={`text-sm font-bold ${getTextColor()}`}>
          {tokenUsage.percentage.toFixed(1)}%
        </span>
      </div>

      <div
        className="h-3 rounded-full overflow-hidden mb-2"
        style={{
          background: 'rgba(148, 163, 184, 0.2)'
        }}
      >
        <div
          className={`h-full transition-all duration-500 ${getBarColor()}`}
          style={{ width: `${tokenUsage.percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs" style={{ color: themeColors.textSecondary }}>
        <span>
          {tokenUsage.used.toLocaleString()} utilisés
        </span>
        <span>
          {tokenUsage.limit.toLocaleString()} limite
        </span>
      </div>
    </div>
  );
}

export default TokenUsageBar;
