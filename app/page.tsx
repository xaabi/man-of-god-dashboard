'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, EyeOff, CheckCircle2, Lock, Unlock, RefreshCw, TrendingUp, BookOpen } from 'lucide-react';

const INITIAL_CHECKLIST = { sholat5: false, jumatOrDhuhur: false, quran: false, sleep7h: false, noChartAfter9pm: false };

export default function Page() {
  const [usdRate] = useState(15700);
  const [coreValue] = useState(226000000);
  const [tacticalPnlUsd] = useState(26000);
  const [tacticalDailyLossPercent] = useState(10.66);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [isSick] = useState(false);
  const [isCoreHidden, setIsCoreHidden] = useState(false);

  useEffect(() => {
    const savedChecklist = localStorage.getItem('mog_checklist');
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
    const savedCoreHidden = localStorage.getItem('mog_core_hidden');
    if (savedCoreHidden) setIsCoreHidden(JSON.parse(savedCoreHidden));
  }, []);

  const toggleChecklist = (key: keyof typeof INITIAL_CHECKLIST) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem('mog_checklist', JSON.stringify(updated));
  };

  const toggleHideCore = () => {
    const val = !isCoreHidden;
    setIsCoreHidden(val);
    localStorage.setItem('mog_core_hidden', JSON.stringify(val));
  };

  const tacticalValueIdr = tacticalPnlUsd * usdRate;
  const totalNetWorthIdr = coreValue + tacticalValueIdr;
  const coreRatio = Math.round((coreValue / totalNetWorthIdr) * 100);
  const tacticalRatio = 100 - coreRatio;
  const isGateLocked = !(checklist.sholat5 && checklist.sleep7h && checklist.noChartAfter9pm);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Man of God — Dashboard</h1>
          <p className="text-xs font-semibold text-amber-400 mt-1">High Contrast Anti-Ngantuk Mode</p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-black bg-emerald-500 text-slate-950">Connected</span>
      </header>

      {tacticalDailyLossPercent >= 10 && (
        <div className="bg-rose-600 text-white rounded-2xl p-5 border-2 border-white shadow-lg flex justify-between items-center">
          <div>
            <span className="text-xs font-black bg-black px-2 py-0.5 rounded">STOP TRADING</span>
            <h3 className="text-lg font-black mt-1">Circuit Breaker Active ({tacticalDailyLossPercent}% Daily Loss)</h3>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white text-slate-950 border-4 border-amber-400 rounded-2xl p-6 shadow-2xl">
          <span className="text-xs font-black text-slate-500 uppercase">TOTAL NET WORTH</span>
          <div className="text-3xl font-black font-mono text-slate-950 my-2">
            Rp {(totalNetWorthIdr / 1000000).toFixed(1)}M
          </div>
          <span className="text-xs font-bold text-amber-600 font-mono">˜  USD</span>
        </div>

        <div className="bg-slate-800 border-2 border-emerald-400 rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-black text-emerald-400 uppercase">CORE PORTFOLIO (75%)</span>
          <div className="text-3xl font-black font-mono text-white my-2">
            {isCoreHidden ? 'Hidden' : Rp M}
          </div>
          <button onClick={toggleHideCore} className="text-xs font-bold text-slate-300 underline mt-2">
            {isCoreHidden ? 'Unhide' : 'Hide 7 Days'}
          </button>
        </div>

        <div className="bg-slate-800 border-2 border-amber-400 rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-black text-amber-400 uppercase">TACTICAL FUTURES (25%)</span>
          <div className="text-3xl font-black font-mono text-amber-300 my-2">
            {isGateLocked ? 'LOCKED' : +main{tacticalPnlUsd.toLocaleString()} USD}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-xs font-black">
          <span>PORTFOLIO SPLIT RATIO</span>
          <span>Target: 75% / 25%</span>
        </div>
        <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-600">
          <div style={{ width: ${coreRatio}% }} className="bg-emerald-400 h-full"></div>
          <div style={{ width: ${tacticalRatio}% }} className="bg-amber-400 h-full"></div>
        </div>
      </div>

      <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-black text-amber-400">SPIRITUAL & DISCIPLINE GATE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { key: 'sholat5', label: 'Sholat 5 Waktu' },
            { key: 'jumatOrDhuhur', label: isSick ? 'Dhuhur (Rukhsah)' : 'Jumatan / Dhuhur' },
            { key: 'quran', label: "Baca Al-Qur'an" },
            { key: 'sleep7h', label: 'Tidur 7 Jam' },
            { key: 'noChartAfter9pm', label: 'No Chart > 21:00' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleChecklist(item.key as keyof typeof INITIAL_CHECKLIST)}
              className={p-3 rounded-xl border-2 text-xs font-bold }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
