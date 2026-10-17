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
            {isGateLocked ? 'LOCKED' : +'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  EyeOff, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RefreshCw, 
  TrendingUp,
  BookOpen
} from 'lucide-react';

const INITIAL_CHECKLIST = {
  sholat5: false,
  jumatOrDhuhur: false,
  quran: false,
  sleep7h: false,
  noChartAfter9pm: false,
};

export default function HighEnergyDashboard() {
  const [usdRate] = useState(15700);
  const [coreValue] = useState(226000000); // Rp 226M
  const [tacticalPnlUsd] = useState(26000); // $26k
  const [tacticalDailyLossPercent] = useState(10.66); // IHSG -10.66%

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8 max-w-6xl mx-auto space-y-6 selection:bg-amber-500 selection:text-zinc-950">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            Man of God <span className="text-amber-400 font-light">—</span> Dashboard
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Calmness & Spiritual Balance in Trading
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Supabase / Prisma Connected
          </span>
        </div>
      </header>

      {/* CIRCUIT BREAKER BANNER */}
      {tacticalDailyLossPercent >= 10 && (
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-950/90 via-rose-900/60 to-zinc-950 border-2 border-rose-500/80 rounded-2xl p-5 shadow-[0_0_25px_rgba(244,63,94,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-lg border border-rose-400/50 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white px-2 py-0.5 rounded font-mono">
                  Circuit Breaker Active ({tacticalDailyLossPercent}% Daily Loss)
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-1">
                STOP TRADING TODAY — Protect your Core & Ibadah.
              </h3>
              <p className="text-xs font-medium text-rose-200/90 leading-relaxed">
                Tactical drawdown limit breached. Step away from screens, close charts, and regain spiritual peace.
              </p>
            </div>
          </div>
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl border border-rose-300 shadow-md transition-all shrink-0">
            STOP TRADING
          </button>
        </div>
      )}

      {/* HERO CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* TOTAL NET WORTH */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block">TOTAL NET WORTH</span>
          <div className="my-3">
            <div className="text-3xl font-black font-mono text-white tracking-tight drop-shadow-sm">
              Rp {(totalNetWorthIdr / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs font-bold text-amber-400 font-mono mt-1">
              ˜ ${Math.round(totalNetWorthIdr / usdRate).toLocaleString()} USD
            </div>
          </div>
        </div>

        {/* CORE PORTFOLIO */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-6 shadow-xl transition-all relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">CORE PORTFOLIO (IDX / GOLD)</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-black px-2 py-0.5 rounded-md font-mono">
              75% Target
            </span>
          </div>
          <div className="my-3">
            {isCoreHidden ? (
              <div className="text-xl font-bold text-zinc-500 flex items-center gap-2 py-1">
                <EyeOff className="w-5 h-5 text-zinc-400" /> Hidden for Peace
              </div>
            ) : (
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                Rp {(coreValue / 1000000).toFixed(1)}M
              </div>
            )}
            <div className="text-xs font-semibold text-emerald-400 mt-1">
              Long-term Peace
            </div>
          </div>
          <button 
            onClick={toggleHideCore} 
            className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors border-t border-zinc-800/80 pt-3 w-full"
          >
            {isCoreHidden ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-400" />}
            {isCoreHidden ? 'Unhide Core Portfolio' : 'Hide Core for 7 Days'}
          </button>
        </div>

        {/* TACTICAL FUTURES */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-xl transition-all relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">TACTICAL FUTURES (NAS100)</span>
            <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-500/50 font-black px-2 py-0.5 rounded-md font-mono">
              25% Target
            </span>
          </div>
          <div className="my-3">
            {isGateLocked ? (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-amber-300">
                  Centang Sholat & Istirahat <br />
                  <span className="text-[10px] text-amber-200/70 font-normal">Untuk Membuka Angka Porto</span>
                </span>
              </div>
            ) : (
              <div className="text-3xl font-black font-mono text-amber-400 tracking-tight">
                +${tacticalPnlUsd.toLocaleString()} USD
              </div>
            )}
            <div className="text-xs font-semibold text-zinc-400 mt-1">
              Floating Futures P/L
            </div>
          </div>
        </div>

      </div>

      {/* PORTFOLIO SPLIT RATIO BAR */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex justify-between text-xs font-bold text-zinc-300">
          <span className="tracking-wider">PORTFOLIO SPLIT RATIO</span>
          <span className="font-mono text-zinc-400">Target: 75% Core / 25% Tactical</span>
        </div>
        <div className="h-3.5 w-full bg-zinc-950 rounded-full overflow-hidden flex p-0.5 border border-zinc-800">
          <div style={{ width: `${coreRatio}%` }} className="h-full bg-emerald-400 rounded-l-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <div style={{ width: `${tacticalRatio}%` }} className="h-full bg-amber-400 rounded-r-full transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        </div>
        <div className="flex justify-between text-xs font-bold font-mono">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Core ({coreRatio}%) — Target 75%
          </span>
          <span className="text-amber-400 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Tactical ({tacticalRatio}%) — Target 25%
          </span>
        </div>
      </div>

      {/* AUTO REBALANCING CALCULATOR */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-white tracking-wider">
            <RefreshCw className="w-4 h-4 text-amber-400" /> AUTO REBALANCING CALCULATOR
          </div>
          <span className="text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
            Target Ratio 75:25
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono space-y-1.5">
            <div className="text-zinc-500 font-bold mb-1">Status Portofolio Saat Ini:</div>
            <div className="flex justify-between text-zinc-200">
              <span>Core Actual:</span>
              <span className="font-bold text-white">Rp 226.0M</span>
            </div>
            <div className="flex justify-between text-zinc-200">
              <span>Tactical Actual:</span>
              <span className="font-bold text-amber-400">$26,000 USD</span>
            </div>
          </div>

          <div className="bg-amber-950/30 border border-amber-500/50 p-4 rounded-xl text-xs space-y-1">
            <div className="text-amber-400 font-black flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> REKOMENDASI REBALANCE
            </div>
            <p className="text-amber-100 font-semibold leading-relaxed">
              Tarik <span className="text-amber-400 font-bold font-mono">$15,924 USD</span> dari Tactical Futures, lalu amankan ke Core Portfolio sebesar <span className="text-emerald-400 font-bold font-mono">Rp 251.6M</span>.
            </p>
          </div>
        </div>
      </div>

      {/* SPIRITUAL & DISCIPLINE GATE */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 gap-3">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" /> SPIRITUAL & DISCIPLINE GATE
            </h2>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">Pilar Utama: Utamakan Ibadah & Istirahat Sebelum Cek Porto</p>
          </div>
          <button className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start md:self-auto">
            <Lock className="w-3.5 h-3.5" /> Porto Blurred
          </button>
        </div>

        {/* CHECKLIST GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { key: 'sholat5', label: 'Sholat 5 Waktu' },
            { key: 'jumatOrDhuhur', label: isSick ? 'Dhuhur (Rukhsah)' : 'Jumatan / Dhuhur' },
            { key: 'quran', label: "Baca Al-Qur'an" },
            { key: 'sleep7h', label: 'Tidur 7 Jam' },
            { key: 'noChartAfter9pm', label: 'No Chart > 21:00' },
          ].map((item) => {
            const isChecked = checklist[item.key as keyof typeof INITIAL_CHECKLIST];
            return (
              <button
                key={item.key}
                onClick={() => toggleChecklist(item.key as keyof typeof INITIAL_CHECKLIST)}
                className={`p-3.5 rounded-xl border text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
                  isChecked 
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isChecked ? 'text-emerald-400 fill-emerald-950' : 'text-zinc-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <footer className="text-center text-xs font-bold text-zinc-500 border-t border-zinc-800/80 pt-6">
        Man of God Core-Satellite Dashboard — Built for Peace, Long-term Wealth & Discipline.
      </footer>
    </div>
  );
}{tacticalPnlUsd.toLocaleString()} USD}
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
