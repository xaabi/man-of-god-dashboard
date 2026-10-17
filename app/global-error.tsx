'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#0B0F17] text-slate-100 flex items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-200">Global Error Encountered</h2>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs"
          >
            Reset
          </button>
        </div>
      </body>
    </html>
  );
}