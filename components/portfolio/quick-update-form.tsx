'use client';

import React, { useState } from 'react';
import { RefreshCw, Save } from 'lucide-react';

interface QuickUpdateFormProps {
  initialCoreIDR: number;
  initialTacticalUSD: number;
  initialDailyLoss: number;
  initialMaxDrawdown: number;
}

export function QuickUpdateForm({
  initialCoreIDR,
  initialTacticalUSD,
  initialDailyLoss,
  initialMaxDrawdown,
}: QuickUpdateFormProps) {
  const [coreIDR, setCoreIDR] = useState(initialCoreIDR);
  const [tacticalUSD, setTacticalUSD] = useState(initialTacticalUSD);
  const [dailyLoss, setDailyLoss] = useState(initialDailyLoss);
  const [maxDrawdown, setMaxDrawdown] = useState(initialMaxDrawdown);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/portfolio/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          corePortfolioIDR: coreIDR,
          tacticalPortfolioUSD: tacticalUSD,
          dailyLossPercent: dailyLoss,
          maxDrawdownLimit: maxDrawdown,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Quick Risk & Balance Control</h3>
        <span className="text-xs text-slate-400">Realtime Database Update</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Core (IDR)</label>
          <input
            type="number"
            value={coreIDR}
            onChange={(e) => setCoreIDR(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Tactical (USD)</label>
          <input
            type="number"
            value={tacticalUSD}
            onChange={(e) => setTacticalUSD(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Daily Loss (%)</label>
          <input
            type="number"
            step="0.01"
            value={dailyLoss}
            onChange={(e) => setDailyLoss(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:border-rose-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Max Drawdown (%)</label>
          <input
            type="number"
            step="0.1"
            value={maxDrawdown}
            onChange={(e) => setMaxDrawdown(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-950 rounded-lg text-xs font-bold hover:bg-slate-200 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Update Dashboard
        </button>
      </div>
    </form>
  );
}