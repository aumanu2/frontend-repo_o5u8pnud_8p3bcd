import React from 'react';
import Hero3D from './components/Hero3D';
import HorizontalNav from './components/HorizontalNav';
import InfiniteScrollHint from './components/InfiniteScrollHint';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Hero3D />
      <InfiniteScrollHint />
      <HorizontalNav />
      <FooterCTA />
    </div>
  );
}

export default App;
