'use client';

import React, { useEffect, useState } from 'react';
import { CircuitBreaker } from '@/components/portfolio/circuit-breaker';
import { PortfolioSplitBar } from '@/components/portfolio/split-bar';
import { RebalanceCalc } from '@/components/portfolio/rebalance-calc';
import { JournalSection } from '@/components/spiritual/journal-section';
import { QuickUpdateForm } from '@/components/portfolio/quick-update-form';
import { Lock } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState({
    corePortfolioIDR: 226000000,
    tacticalPortfolioUSD: 26000,
    usdToIdrRate: 15800,
    dailyLossPercent: 10.66,
    maxDrawdownLimit: 5.0,
  });
  const [journalEntries, setJournalEntries] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {});

    fetch('/api/journal')
      .then((res) => res.json())
      .then((j) => setJournalEntries(j))
      .catch(() => {});
  }, []);

  const tacticalIDR = data.tacticalPortfolioUSD * data.usdToIdrRate;
  const totalNetWorthIDR = data.corePortfolioIDR + tacticalIDR;
  const totalNetWorthUSD = totalNetWorthIDR / data.usdToIdrRate;

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
            Man of God — Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Calmness & Spiritual Balance in Trading
          </p>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Supabase / Prisma Connected
          </span>
        </div>
      </header>

      {/* Circuit Breaker Alert */}
      <CircuitBreaker
        dailyLossPercent={data.dailyLossPercent}
        maxDrawdownLimit={data.maxDrawdownLimit}
      />

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Net Worth */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Net Worth</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 font-mono">
            Rp {(totalNetWorthIDR / 1000000).toFixed(1)}M
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            ≈ ${Math.round(totalNetWorthUSD).toLocaleString('en-US')} USD
          </p>
        </div>

        {/* Core Portfolio */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Core Portfolio (IDX / Gold)</p>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">75% Target</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 font-mono">
            Rp {(data.corePortfolioIDR / 1000000).toFixed(1)}M
          </h2>
          <p className="text-xs text-slate-400 mt-1">Long-term Peace</p>
        </div>

        {/* Tactical Futures (dengan auto-blur jika belum centang ibadah) */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden transition-all duration-500">
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">Tactical Futures (NAS100)</p>
            <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">25% Target</span>
          </div>

          <div className={`mt-2 transition-all duration-500 ${isUnlocked ? 'filter-none' : 'blur-md select-none opacity-40'}`}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 font-mono">
              ${data.tacticalPortfolioUSD.toLocaleString('en-US')}
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              ≈ Rp {(tacticalIDR / 1000000).toFixed(1)}M
            </p>
          </div>

          {!isUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-xs p-2 text-center">
              <Lock className="w-4 h-4 text-amber-400 mb-1 animate-bounce" />
              <p className="text-[10px] font-semibold text-amber-300">Centang Sholat & Istirahat</p>
              <p className="text-[9px] text-slate-400">Untuk Membuka Angka Porto</p>
            </div>
          )}
        </div>
      </section>

      {/* Split Bar */}
      <PortfolioSplitBar
        coreValIDR={data.corePortfolioIDR}
        tacticalValUSD={data.tacticalPortfolioUSD}
        usdToIdrRate={data.usdToIdrRate}
      />

      {/* Rebalancing Calculator */}
      <RebalanceCalc
        coreValIDR={data.corePortfolioIDR}
        tacticalValUSD={data.tacticalPortfolioUSD}
        usdToIdrRate={data.usdToIdrRate}
      />

      {/* Spiritual Journal Section */}
      <JournalSection
        initialEntries={journalEntries}
        onSpiritualCheckChange={(unlocked) => setIsUnlocked(unlocked)}
      />

      {/* Quick Update Form */}
      <QuickUpdateForm
        initialCoreIDR={data.corePortfolioIDR}
        initialTacticalUSD={data.tacticalPortfolioUSD}
        initialDailyLoss={data.dailyLossPercent}
        initialMaxDrawdown={data.maxDrawdownLimit}
      />
    </main>
  );
}