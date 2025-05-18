import React, { useRef, useState } from 'react';

const MeditationPage = () => {
  const audioRef = useRef(null);
  const [selectedAudio, setSelectedAudio] = useState('nature');
  const [hasStarted, setHasStarted] = useState(false);

  const audioOptions = {
    nature: '/nature.mp3',
    ocean: '/ocean.mp3',
    piano: '/piano.mp3',
    windchimes: '/windchimes.mp3',
    rain: '/rain.mp3',
  };

  const handleAudioChange = (e) => {
    const newAudio = e.target.value;
    setSelectedAudio(newAudio);
    if (audioRef.current && hasStarted) {
      audioRef.current.pause();
      audioRef.current.src = audioOptions[newAudio];
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.error('Play error after switch:', err));
    }
  };

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = audioOptions[selectedAudio];
      audioRef.current.play()
        .then(() => setHasStarted(true))
        .catch((err) => console.error('Start Play error:', err));
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-cyan-100 to-blue-300 overflow-hidden p-6">

      {/* Floating Bubbles Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-200 rounded-full opacity-40 animate-floating"
            style={{
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Audio Selector Card */}
      <div className="absolute top-6 right-6 bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-4 w-56 z-10">
        <label className="block text-md font-semibold text-gray-800 mb-2">🎵 Choose Music:</label>
        <select
          value={selectedAudio}
          onChange={handleAudioChange}
          className="border border-blue-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="nature">🌳 Nature Sounds</option>
          <option value="ocean">🌊 Ocean Waves</option>
          <option value="piano">🎹 Gentle Piano</option>
          <option value="windchimes">🔔 Wind Chimes</option>
          <option value="rain">🌧️ Rainfall</option>
        </select>

        {/* Start Music Button */}
        {!hasStarted && (
          <button
            onClick={startAudio}
            className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-all duration-300"
          >
            Start Music
          </button>
        )}

        {hasStarted && (
          <div className="text-center text-sm text-gray-700 mt-2">
            🎶 Now Playing: <span className="font-bold capitalize">{selectedAudio}</span>
          </div>
        )}
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6 z-10 drop-shadow-lg">
        🧘 Calm Breathing
      </h1>

      {/* Breathing Bubble Animation */}
      <div className="relative w-80 h-80 flex items-center justify-center z-10">
        <div className="w-60 h-60 rounded-full bg-blue-300 animate-breathe opacity-70"></div>
      </div>

      {/* Breathing Instruction */}
      <p className="mt-8 text-2xl text-gray-700 font-medium z-10">Breathe in... Breathe out...</p>

      {/* Audio Tag */}
      <audio ref={audioRef} loop />
    </div>
  );
};

export default MeditationPage;
