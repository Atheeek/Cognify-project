import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const CalmDownCorner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">🧘 Calm Down Corner</h1>
        <p className="text-lg text-gray-600">
          Relax, breathe, and create — welcome to your safe space.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        
        {/* Meditation/Breathing Section */}
        <Link
          to="/calm-down/meditation"
          className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all flex flex-col items-center"
        >
          <div className="bg-blue-100 p-4 rounded-full mb-6">
            <PlayIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Guided Meditation</h2>
          <p className="text-gray-500 text-center">
            Listen to calming exercises and breathe deeply.
          </p>
        </Link>

        {/* Digital Coloring Section */}
        <Link
          to="/calm-down/coloring"
          className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all flex flex-col items-center"
        >
          <div className="bg-pink-100 p-4 rounded-full mb-6">
            <PaintBrushIcon className="h-12 w-12 text-pink-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-pink-700">Digital Coloring</h2>
          <p className="text-gray-500 text-center">
            Relax by coloring beautiful pictures.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default CalmDownCorner;
