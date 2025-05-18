import React, { useState, useEffect } from 'react';

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const ColorfulPuzzles = () => {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [confusionMode, setConfusionMode] = useState(false);
  const [fakeLabel, setFakeLabel] = useState(""); // For Dyslexia test

  // Timer logic
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleWrongAnswer("⏰ Time’s up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetColor, gameOver]);

  useEffect(() => {
    if (score !== 0 && score % 5 === 0) {
      setLevel((prev) => prev + 1);
      setConfusionMode(level >= 3); // Enable confusion mode from level 3
    }
  }, [score]);

  const handleWrongAnswer = (message) => {
    setLives((prev) => {
      if (prev <= 1) {
        setGameOver(true);
        setFeedback("💥 Game Over!");
        return 0;
      } else {
        setFeedback(`❌ ${message}`);
        return prev - 1;
      }
    });

    setTimeout(() => {
      setFeedback("");
      resetTurn();
    }, 1000);
  };

  const resetTurn = () => {
    const newColor = getRandomColor();
    setTargetColor(newColor);
    setFakeLabel(confusionMode ? getRandomColor() : newColor);
    setTimeLeft(10);
  };

  const handleColorClick = (color) => {
    if (gameOver) return;
    if (color === targetColor) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback("");
        resetTurn();
      }, 800);
    } else {
      handleWrongAnswer("Wrong color!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        {gameOver ? (
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over</h2>
            <p className="text-lg text-gray-700 mb-2">Final Score: {score}</p>
            <p className="text-gray-600 mb-4">You reached level {level}</p>
            <button
              onClick={() => {
                setScore(0);
                setLives(3);
                setLevel(1);
                setGameOver(false);
                setFeedback("");
                resetTurn();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Restart
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-blue-700 mb-4">🎨 Colorful Puzzles</h1>
            <p className="text-lg text-gray-700 mb-1">Level: {level}</p>
            <p className="text-md text-gray-700 mb-2">Lives: {lives} ❤️</p>
            <p className="text-md mb-2">Time Left: ⏳ {timeLeft}s</p>

            <div className={`text-3xl font-bold mb-4 transition-all duration-300`} style={{ color: targetColor }}>
              {confusionMode ? fakeLabel.toUpperCase() : targetColor.toUpperCase()}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`w-20 h-20 rounded-full shadow-lg hover:scale-110 transition-all`}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>

            <div className="text-lg font-semibold text-gray-800">{feedback}</div>
            <div className="mt-4 text-xl font-semibold text-blue-800">⭐ Score: {score}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorfulPuzzles;
