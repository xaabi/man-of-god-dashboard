'use client';

import React from 'react';

interface PortfolioSplitProps {
  coreValIDR: number;
  tacticalValUSD: number;
  usdToIdrRate: number;
}

export function PortfolioSplitBar({ coreValIDR, tacticalValUSD, usdToIdrRate }: PortfolioSplitProps) {
  const tacticalValIDR = tacticalValUSD * usdToIdrRate;
  const totalValIDR = coreValIDR + tacticalValIDR;

  const corePercent = totalValIDR > 0 ? (coreValIDR / totalValIDR) * 100 : 75;
  const tacticalPercent = totalValIDR > 0 ? (tacticalValIDR / totalValIDR) * 100 : 25;

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Portfolio Split Ratio</span>
        <span className="text-xs font-mono text-slate-400">Target: 75% Core / 25% Tactical</span>
      </div>

      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/50">
        <div
          style={{ width: `${corePercent}%` }}
          className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
          title={`Core Portfolio: ${corePercent.toFixed(1)}%`}
        />
        <div
          style={{ width: `${tacticalPercent}%` }}
          className="h-full bg-amber-500 rounded-r-full transition-all duration-500"
          title={`Tactical Portfolio: ${tacticalPercent.toFixed(1)}%`}
        />
      </div>

      <div className="flex justify-between text-xs mt-3 text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span>Core ({corePercent.toFixed(1)}%) — Target 75%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <span>Tactical ({tacticalPercent.toFixed(1)}%) — Target 25%</span>
        </div>
      </div>
    </div>
  );
}