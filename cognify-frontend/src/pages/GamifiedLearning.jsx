import React from 'react';
import { Link } from 'react-router-dom';

const GamifiedLearning = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800 min-h-screen">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-5 shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
            <span role="img" aria-label="game">🎮</span>
            Gamified Learning
          </h1>
        </nav>
      </header>

      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Interactive Learning Games</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Fun, engaging, and educational games to support neurodiverse children in a playful way.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Memory Match Game */}
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-3xl font-bold mb-2 text-purple-700">Game 1: Memory Match</h3>
            <p className="text-gray-600 mb-4">Test your memory skills with fun matching challenges.</p>
            <Link to="/memory-match">
              <button className="bg-purple-600 text-white py-2 px-6 rounded-full text-lg hover:bg-purple-700">Start Game</button>
            </Link>
          </div>

          {/* Colorful Puzzles Placeholder */}
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-3xl font-bold mb-2 text-blue-700">Game 2: Shape Sorting</h3>
            <p className="text-gray-600 mb-4">Complete visually stimulating puzzles to boost pattern recognition.</p>
            <Link to="/shape-sorting">
  <button className="bg-pink-600 text-white py-2 px-6 rounded-full text-lg hover:bg-pink-700">Start Game</button>
</Link>
          </div>

          {/* Shape Sorting Placeholder */}
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform">
          <h3 className="text-3xl font-bold mb-2 text-blue-700">Game 2: Colorful Puzzles</h3>
          <p className="text-gray-600 mb-4">Complete visually stimulating puzzles to boost color recognition.</p>
          <Link to="/colourful-puzzles">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-700">Start Game</button>
          </Link>
        </div>

          {/* Additional Placeholder */}
          {/* <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-3xl font-bold mb-2 text-green-600">Game 4: Sound Match</h3>
            <p className="text-gray-600 mb-4">Match objects based on their sounds to improve auditory processing.</p>
            <button className="bg-green-600 text-white py-2 px-6 rounded-full text-lg hover:bg-green-700">Coming Soon</button>
          </div> */}
        </div>
      </section>

      <footer className="text-center p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white mt-10">
        <p className="text-lg">&copy; 2025 Cognify. All rights reserved. | Designed for every child’s unique journey 🎮</p>
      </footer>
    </div>
  );
};

export default GamifiedLearning;
