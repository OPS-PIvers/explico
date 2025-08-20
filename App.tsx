import React from 'react';
import SlideDeckViewer from './components/SlideDeckViewer';
import { mockSlideDeck } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="w-full max-w-7xl px-4 py-2 mb-4">
        <h1 className="font-bold" style={{ fontSize: '28pt', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          <span className="text-[#2d3f89]">ORONO</span>
          <span className="text-[#ad2122]">TECHNOLOGY</span>
        </h1>
        <p className="font-bold text-[#999999]" style={{ fontSize: '14pt' }}>Interactive Learning Platform</p>
      </header>
      <main className="w-full flex-grow flex items-center justify-center">
        <SlideDeckViewer deck={mockSlideDeck} />
      </main>
      <footer className="w-full text-center p-4 mt-4 text-gray-500 text-sm">
        <p>&copy; 2024 Orono Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;