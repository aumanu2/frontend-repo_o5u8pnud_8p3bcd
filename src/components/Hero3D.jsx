import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/0UnIIJngGgvQNHiD/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft color glows overlay - won't block interaction with Spline */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Cinematic Portfolio
          </h1>
          <p className="mt-4 text-lg text-slate-200 sm:text-xl">
            Scroll horizontally to explore — colorful, parallax, and infinitely looping.
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-sm">Scroll</span>
            <div className="h-8 w-5 rounded-full border border-slate-400/50">
              <div className="mx-auto mt-1 h-2 w-2 animate-bounce rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
