/**
 * Token Budget Widget
 *
 * Affiche l'usage des tokens IA et le coût en temps réel
 */

import { useEffect, useState } from 'react';
import { useAppCtx } from '../store/useAppCtx';

interface TokenUsageData {
  ok: boolean;
  model: string;
  budget_total: number;
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  calls_count: number;
  avg_tokens_per_task: number | null;
  tasks_left: number | null;
  cost_usd: number;
  cost_config: {
    input_per_million: number;
    output_per_million: number;
  };
}

export function TokenBudget() {
  const { apiBase } = useAppCtx();
  const [data, setData] = useState<TokenUsageData | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  async function loadUsage() {
    try {
      const res = await fetch(`${apiBase}/api/ai/usage`);
      const json = await res.json();

      if (!json.ok) {
        throw new Error(json.error || 'Erreur récupération usage');
      }

      setData(json);
      setError(undefined);
    } catch (e) {
      console.error('[TokenBudget] Erreur:', e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Charger au montage + polling toutes les 10s
  useEffect(() => {
    loadUsage();
    const interval = setInterval(loadUsage, 10_000);
    return () => clearInterval(interval);
  }, [apiBase]);

  // États d'erreur ou loading
  if (error) {
    return (
      <div className="flex items-center gap-2 text-rose-400 text-xs">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>AI: erreur</span>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <div className="animate-spin w-4 h-4 border-2 border-slate-600 border-t-cyan-400 rounded-full"></div>
        <span>AI: chargement...</span>
      </div>
    );
  }

  // Calculs
  const used = data.tokens.total;
  const cap = data.budget_total;
  const pct = Math.min(100, Math.round((used / cap) * 100));
  const capReached = used >= cap;

  // Couleurs progressives
  let barColor = 'bg-cyan-400';
  if (pct > 90) barColor = 'bg-rose-500';
  else if (pct > 75) barColor = 'bg-orange-500';
  else if (pct > 50) barColor = 'bg-yellow-500';

  // Model name court
  const modelShort = data.model?.includes('haiku') ? 'Haiku' :
                     data.model?.includes('sonnet') ? 'Sonnet' :
                     data.model?.includes('opus') ? 'Opus' : 'AI';

  return (
    <div className="flex flex-col gap-2 bg-slate-900/80 border border-slate-700/50 rounded-lg p-3 min-w-[280px] shadow-lg">
      {/* Header avec modèle et status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-200">Budget IA</span>
          <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-cyan-400 font-medium">
            {modelShort}
          </span>
        </div>

        {capReached && (
          <span className="px-2 py-0.5 bg-rose-500/20 border border-rose-500/40 rounded text-[10px] text-rose-400 font-bold animate-pulse">
            CAP ATTEINT
          </span>
        )}
      </div>

      {/* Barre de progression */}
      <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700">
        <div
          className={`h-full transition-all duration-300 ${barColor} ${capReached ? 'animate-pulse' : ''} shadow-md`}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white drop-shadow-lg">
            {pct}%
          </span>
        </div>
      </div>

      {/* Infos détaillées */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        {/* Tokens */}
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-semibold mb-0.5">Tokens</span>
          <span className={`font-mono ${capReached ? 'text-rose-400 font-bold' : 'text-slate-200'}`}>
            {(used / 1000).toFixed(1)}K
          </span>
          <span className="text-slate-500 text-[10px]">
            / {(cap / 1000).toFixed(0)}K
          </span>
        </div>

        {/* Coût */}
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-semibold mb-0.5">Coût</span>
          <span className="font-mono text-slate-200">
            ${data.cost_usd.toFixed(4)}
          </span>
          <span className="text-slate-500 text-[10px]">
            {data.calls_count} appels
          </span>
        </div>

        {/* Tâches restantes */}
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-semibold mb-0.5">Restant</span>
          {data.tasks_left !== null && !capReached ? (
            <>
              <span className="font-mono text-emerald-400">
                ~{data.tasks_left > 9999 ? `${Math.floor(data.tasks_left / 1000)}K` : data.tasks_left}
              </span>
              <span className="text-slate-500 text-[10px]">tâches</span>
            </>
          ) : (
            <span className="text-slate-500 text-[10px]">
              {capReached ? 'Aucune' : 'Calcul...'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
