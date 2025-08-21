import React from 'react';
import SlideDeckViewer from './components/SlideDeckViewer';
import { mockSlideDeck } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] text-white flex flex-col items-center p-4 font-sans">
      <header className="w-full max-w-7xl px-6 py-4 mb-6 bg-black/20 border-b-2 border-[#ad2122]/50 rounded-t-lg">
        <h1 className="text-3xl md:text-4xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          <span className="text-[#2d3f89]">ORONO</span>
          <span className="text-[#ad2122]">TECHNOLOGY</span>
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-400">Interactive Learning Platform</p>
      </header>
      <main className="w-full flex-grow flex items-center justify-center">
        <SlideDeckViewer deck={mockSlideDeck} />
      </main>
      <footer className="w-full max-w-7xl text-center p-4 text-gray-400 text-sm bg-black/20 border-t-2 border-gray-800/60 rounded-b-lg">
        <p>&copy; 2024 Orono Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;