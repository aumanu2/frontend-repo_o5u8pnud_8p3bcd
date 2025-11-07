import React from 'react';

export default function FooterCTA() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-black to-slate-950 py-16 text-center text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-48 w-[70%] -translate-x-1/2 rounded-b-[50%] bg-white/5 blur-2xl" />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold sm:text-4xl">Like what you saw?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          This horizontal, parallax portfolio navigator loops forever. Let’s tailor it to your work and ship it.
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          Get in touch
        </a>
      </div>
    </footer>
  );
}
