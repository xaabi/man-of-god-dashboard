'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, CheckCircle2, TrendingUp } from 'lucide-react';

interface RebalanceCalcProps {
  coreValIDR: number;
  tacticalValUSD: number;
  usdToIdrRate: number;
}

export function RebalanceCalc({ coreValIDR, tacticalValUSD, usdToIdrRate }: RebalanceCalcProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tacticalValIDR = tacticalValUSD * usdToIdrRate;
  const totalValIDR = coreValIDR + tacticalValIDR;

  // Target 75% Core, 25% Tactical
  const targetCoreIDR = totalValIDR * 0.75;
  const targetTacticalIDR = totalValIDR * 0.25;

  // Difference
  const coreDiffIDR = targetCoreIDR - coreValIDR;
  const tacticalDiffUSD = (targetTacticalIDR - tacticalValIDR) / usdToIdrRate;

  const needsRebalance = Math.abs(coreDiffIDR) > 1000000;

  if (!mounted) return null;

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Auto Rebalancing Calculator
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
          Target Ratio 75:25
        </span>
      </div>

      {!needsRebalance ? (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-400">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-xs">
            Portofolio kamu saat ini seimbang (mendekati rasio ideal 75:25). Belum perlu rebalancing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-xs text-slate-400 mb-1">Status Portofolio Saat Ini</p>
            <div className="flex justify-between text-xs font-mono text-slate-300 mt-2">
              <span>Core Actual:</span>
              <span className="font-bold">Rp {(coreValIDR / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mt-1">
              <span>Tactical Actual:</span>
              <span className="font-bold">${tacticalValUSD.toLocaleString('en-US')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-bold text-amber-300 uppercase">Rekomendasi Rebalance</p>
            </div>
            {coreDiffIDR > 0 ? (
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Tarik <span className="font-mono font-bold text-amber-300">${Math.abs(tacticalDiffUSD).toLocaleString('en-US', { maximumFractionDigits: 0 })} USD</span> dari Tactical Futures, lalu amankan ke Core Portfolio sebesar <span className="font-mono font-bold text-amber-300">Rp {(Math.abs(coreDiffIDR) / 1000000).toFixed(1)}M</span>.
              </p>
            ) : (
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Pindahkan <span className="font-mono font-bold text-amber-300">Rp {(Math.abs(coreDiffIDR) / 1000000).toFixed(1)}M</span> dari Core ke Tactical Futures (<span className="font-mono font-bold text-amber-300">${Math.abs(tacticalDiffUSD).toLocaleString('en-US', { maximumFractionDigits: 0 })} USD</span>) untuk mengisi kembali modal trading.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}