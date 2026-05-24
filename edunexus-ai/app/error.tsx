"use client";

import { useEffect } from "react";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/8 blur-[130px]" />
      </div>
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10">
        <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-sm text-muted-foreground">
        An unexpected error occurred. Our team has been notified. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
