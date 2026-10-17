'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/80 max-w-md">
        <h2 className="text-xl font-bold text-rose-300 mb-2">Something went wrong!</h2>
        <p className="text-xs text-rose-200/80 mb-4 font-mono break-all">
          {error.message || 'An unexpected error occurred while fetching data.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-xs font-semibold text-rose-100 border border-rose-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}