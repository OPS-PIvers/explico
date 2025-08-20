
import React from 'react';
import SlideDeckViewer from './components/SlideDeckViewer';
import { mockSlideDeck } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="w-full max-w-7xl px-4 py-2 mb-4">
        <h1 className="text-3xl font-bold text-cyan-400">ExpliCoLearning</h1>
        <p className="text-gray-400">Interactive Learning Platform</p>
      </header>
      <main className="w-full flex-grow flex items-center justify-center">
        <SlideDeckViewer deck={mockSlideDeck} />
      </main>
      <footer className="w-full text-center p-4 mt-4 text-gray-500 text-sm">
        <p>&copy; 2024 ExpliCoLearning. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
