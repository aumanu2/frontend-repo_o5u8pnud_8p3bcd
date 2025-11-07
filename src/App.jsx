import React from 'react';
import Hero3D from './components/Hero3D.jsx';
import InfiniteScrollHint from './components/InfiniteScrollHint.jsx';
import HorizontalNav from './components/HorizontalNav.jsx';
import FooterCTA from './components/FooterCTA.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative h-screen w-full">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-10">
          <InfiniteScrollHint />
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured Works
            </h2>
            <p className="mt-3 text-center text-neutral-300">
              Glide through an infinite reel. Press Enter on any card to dive in.
            </p>
          </div>
        </div>
        <HorizontalNav />
      </section>

      <FooterCTA />
    </div>
  );
}
