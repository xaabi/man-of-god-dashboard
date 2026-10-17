'use client';

import React from 'react';
import { AlertOctagon, ShieldCheck } from 'lucide-react';

interface CircuitBreakerProps {
  dailyLossPercent: number;
  maxDrawdownLimit: number;
}

export function CircuitBreaker({ dailyLossPercent, maxDrawdownLimit }: CircuitBreakerProps) {
  const isTriggered = dailyLossPercent >= maxDrawdownLimit;

  if (!isTriggered) {
    return (
      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="font-semibold text-sm">Circuit Breaker: Normal</h3>
            <p className="text-xs text-emerald-300/70">Risk levels within safe boundaries. Maintain peace & discipline.</p>
          </div>
        </div>
        <span className="text-xs font-mono bg-emerald-900/50 px-2.5 py-1 rounded-md border border-emerald-700/50">
          Loss: {dailyLossPercent.toFixed(2)}% / {maxDrawdownLimit}%
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-rose-950/80 border-2 border-rose-600 text-rose-200 mb-6 shadow-2xl shadow-rose-950/80 animate-pulse">
      <div className="flex items-start gap-3">
        <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-base text-rose-200 tracking-wide">
              Circuit Breaker Active ({dailyLossPercent.toFixed(2)}% Daily Loss)
            </h3>
            <span className="text-xs font-mono bg-rose-900 text-rose-100 px-2.5 py-1 rounded border border-rose-500 font-bold uppercase tracking-wider">
              STOP TRADING
            </span>
          </div>
          <p className="text-sm text-rose-100 mt-1 font-semibold">
            STOP TRADING TODAY — Protect your Core & Ibadah.
          </p>
          <p className="text-xs text-rose-300/80 mt-1">
            Tactical drawdown limit breached. Step away from screens, close charts, and regain spiritual peace.
          </p>
        </div>
      </div>
    </div>
  );
}