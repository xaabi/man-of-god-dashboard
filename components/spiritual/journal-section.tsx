'use client';

import React, { useState } from 'react';
import { BookOpen, Send, Sparkles, Lock, Unlock } from 'lucide-react';

interface JournalEntryData {
  id: string;
  mood: string;
  isCalm: boolean;
  followedPlan: boolean;
  note: string;
  createdAt: string;
}

interface JournalProps {
  initialEntries: JournalEntryData[];
  onSpiritualCheckChange?: (unlocked: boolean) => void;
}

export function JournalSection({ initialEntries, onSpiritualCheckChange }: JournalProps) {
  const [entries, setEntries] = useState<JournalEntryData[]>(initialEntries);
  const [mood, setMood] = useState('Tenang & Bersyukur');
  const [isCalm, setIsCalm] = useState(true);
  const [followedPlan, setFollowedPlan] = useState(true);
  const [hasPrayed, setHasPrayed] = useState(false);
  const [hasRested, setHasRested] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const isUnlocked = hasPrayed && hasRested;

  const handlePrayedChange = (checked: boolean) => {
    setHasPrayed(checked);
    if (onSpiritualCheckChange) onSpiritualCheckChange(checked && hasRested);
  };

  const handleRestedChange = (checked: boolean) => {
    setHasRested(checked);
    if (onSpiritualCheckChange) onSpiritualCheckChange(hasPrayed && checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, isCalm, followedPlan, note }),
      });
      if (res.ok) {
        const created = await res.json();
        setEntries([created, ...entries]);
        setNote('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Spiritual & Discipline Gate
            </h3>
            <p className="text-xs text-slate-400">Pilar Utama: Utamakan Ibadah & Istirahat Sebelum Cek Porto</p>
          </div>
        </div>
        <span className={`text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all ${
          isUnlocked 
            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
            : 'bg-amber-950 text-amber-400 border-amber-800'
        }`}>
          {isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          {isUnlocked ? 'Porto Unlocked' : 'Porto Blurred'}
        </span>
      </div>

      {/* Checklist Gate */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hasPrayed}
            onChange={(e) => handlePrayedChange(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
          />
          <span className="text-xs text-slate-200 group-hover:text-emerald-400 transition">
            Sudah Sholat / Zikir / Berdoa Sesi Ini
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hasRested}
            onChange={(e) => handleRestedChange(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
          />
          <span className="text-xs text-slate-200 group-hover:text-emerald-400 transition">
            Pikiran Cukup Istirahat & Tidak Lelah
          </span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Kondisi Hati / Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Tenang & Bersyukur">Tenang & Bersyukur</option>
              <option value="Fokus & Disiplin">Fokus & Disiplin</option>
              <option value="Agak Cemas / Ragu">Agak Cemas / Ragu</option>
              <option value="Terpancing Emosi (FOMO)">Terpancing Emosi (FOMO)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="isCalm"
              checked={isCalm}
              onChange={(e) => setIsCalm(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
            />
            <label htmlFor="isCalm" className="text-xs text-slate-300">
              Hati dalam keadaan tenang
            </label>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="followedPlan"
              checked={followedPlan}
              onChange={(e) => setFollowedPlan(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
            />
            <label htmlFor="followedPlan" className="text-xs text-slate-300">
              Patuh pada Trading Plan
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Catatan Refleksi / Pengingat Ibadah</label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tuliskan niat, pembelajaran, atau kondisi psikologis sebelum/sesudah sesi trading..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !note.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Simpan Refleksi
          </button>
        </div>
      </form>

      {/* Entry History */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Catatan Terakhir</h4>
        {entries.length === 0 ? (
          <p className="text-xs text-slate-500 italic">Belum ada catatan jurnal.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-indigo-300">{entry.mood}</span>
                <span className="text-slate-500 font-mono">
                  {new Date(entry.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-xs text-slate-300">{entry.note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}