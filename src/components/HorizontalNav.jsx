import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const sectionsData = [
  { key: 'MyLettering', color: 'from-fuchsia-500 to-rose-500', accent: 'bg-fuchsia-400', subtitle: 'Type, strokes, and vibrant forms' },
  { key: 'Isthmus', color: 'from-cyan-500 to-sky-500', accent: 'bg-cyan-400', subtitle: 'Bridges, maps, and liminal spaces' },
  { key: 'ParentMap', color: 'from-emerald-500 to-teal-500', accent: 'bg-emerald-400', subtitle: 'Guides for families and communities' },
  { key: 'ArqEdu', color: 'from-amber-500 to-orange-500', accent: 'bg-amber-400', subtitle: 'Architecture, learning, and play' },
];

function SectionCard({ title, subtitle, gradient, accent, progress }) {
  const yParallax = useTransform(progress, [0, 1], [40, -40]);
  const rotate = useTransform(progress, [0, 1], [-4, 4]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      style={{ y: yParallax, rotate, scale }}
      className="relative mx-6 flex h-[70vh] w-[85vw] min-w-[320px] max-w-[900px] flex-shrink-0 items-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-8 text-white shadow-2xl backdrop-blur-sm"
    >
      <div className={`pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${accent} opacity-30`} />
      <div className={`pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl ${accent} opacity-20`} />

      <div className="relative z-10">
        <h3 className="text-4xl font-extrabold drop-shadow-sm sm:text-5xl">{title}</h3>
        <p className="mt-3 max-w-xl text-slate-100/90">{subtitle}</p>
        <button className="mt-6 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
          Enter
        </button>
      </div>

      <div className={`absolute inset-0 -z-0 bg-gradient-to-br ${gradient} opacity-70`} />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(transparent, rgba(0,0,0,0.55))' }} />
    </motion.div>
  );
}

export default function HorizontalNav() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const segmentWidthRef = useRef(0);
  const [ready, setReady] = useState(false);

  // Repeat data 3x to simulate infinite loop
  const data = useMemo(() => sectionsData.concat(sectionsData).concat(sectionsData), []);

  // Motion value representing normalized progress across the current segment [0..1]
  const segmentProgress = useMotionValue(0);
  const smooth = useSpring(segmentProgress, { stiffness: 80, damping: 20, mass: 0.5 });

  // Measure and initialize scroll position to the middle segment for seamless looping
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const update = () => {
      const totalWidth = track.scrollWidth;
      const segmentWidth = totalWidth / 3; // since we repeat 3x
      segmentWidthRef.current = segmentWidth;

      // Initialize in the middle segment only once
      if (!ready) {
        viewport.scrollLeft = segmentWidth;
        setReady(true);
      }

      const progress = ((viewport.scrollLeft % segmentWidth) + segmentWidth) % segmentWidth; // wrap positive
      segmentProgress.set(segmentWidth ? progress / segmentWidth : 0);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);

    return () => ro.disconnect();
  }, [ready, segmentProgress]);

  // Keep it infinite: if user nears edges, warp back into the center segment
  const handleScroll = () => {
    const viewport = viewportRef.current;
    const segmentWidth = segmentWidthRef.current;
    if (!viewport || !segmentWidth) return;

    const total = segmentWidth * 3;
    let x = viewport.scrollLeft;

    // When near the start of first or end of last, jump but preserve relative offset
    if (x < segmentWidth * 0.1) {
      viewport.scrollLeft = x + segmentWidth;
      x = viewport.scrollLeft;
    } else if (x > segmentWidth * 1.9) {
      viewport.scrollLeft = x - segmentWidth;
      x = viewport.scrollLeft;
    }

    const progress = ((x % segmentWidth) + segmentWidth) % segmentWidth;
    segmentProgress.set(progress / segmentWidth);
  };

  // Support mice that only emit vertical wheel by mapping deltaY -> horizontal scroll when hovering
  const handleWheel = (e) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-12">
      {/* Background Cinematic Layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[20%] h-96 w-[40%] -skew-y-6 rounded-3xl bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[45%] h-96 w-[40%] skew-y-6 rounded-3xl bg-cyan-400/20 blur-3xl" />
        <div className="absolute left-[5%] bottom-[10%] h-72 w-[35%] rotate-6 rounded-3xl bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[10%] bottom-[5%] h-80 w-[30%] -rotate-6 rounded-3xl bg-amber-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-[90vh] max-w-[2000px] items-center">
        <div
          ref={viewportRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          className="scrollbar-none relative mx-auto h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div ref={trackRef} className="flex h-full items-center">
            {data.map((s, i) => (
              <div key={`${s.key}-${i}`} className="snap-start">
                <SectionCard
                  title={s.key}
                  subtitle={s.subtitle}
                  gradient={s.color}
                  accent={s.accent}
                  progress={smooth}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar tied to segment progress */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 h-1 w-[60%] -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
        <motion.div style={{ scaleX: smooth }} className="origin-left h-full bg-white/60" />
      </div>
    </section>
  );
}
