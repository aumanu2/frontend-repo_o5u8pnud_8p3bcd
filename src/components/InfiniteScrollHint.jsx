import React from 'react';
import { ChevronRight, Infinity } from 'lucide-react';

export default function InfiniteScrollHint() {
  return (
    <div className="relative mx-auto my-10 flex max-w-4xl items-center justify-center gap-4 text-slate-200">
      <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur">
        <Infinity className="h-4 w-4" />
        <span className="text-sm font-medium">Infinite loop — keep scrolling</span>
      </div>
      <div className="flex items-center gap-1 text-slate-400">
        <span className="text-xs">Tip</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-xs">Use trackpad/scroll wheel to travel horizontally</span>
      </div>
    </div>
  );
}
