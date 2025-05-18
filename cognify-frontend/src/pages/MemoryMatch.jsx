import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [lives, setLives] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    const cardImages = ['🐶', '🐱', '🐭', '🦁', '🐷', '🐵'];
    const cardsArray = [...cardImages, ...cardImages].map((image, index) => ({
      id: index,
      image,
      flipped: false,
    }));
    setCards(shuffleArray(cardsArray));
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setDisabled(false);
    setLives(10);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index) => {
    if (disabled || flippedIndexes.includes(index) || gameOver) return;

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (newFlippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndexes;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        setMatchedPairs((prev) => prev + 1);
        setFlippedIndexes([]);
      } else {
        setDisabled(true);
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].flipped = false;
          resetCards[secondIndex].flipped = false;
          setCards(resetCards);
          setFlippedIndexes([]);
          setDisabled(false);
          setLives((prevLives) => {
            if (prevLives - 1 <= 0) setGameOver(true);
            return prevLives - 1;
          });
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-center py-10 px-4">
      <h3 className="text-4xl font-extrabold text-purple-700 mb-4">🧠 Memory Match Game</h3>
      <p className="text-lg text-gray-700 mb-6">Match pairs of cards. You have 10 lives. Good luck!</p>

      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`cursor-pointer text-3xl flex items-center justify-center h-24 rounded-xl transition-transform duration-300 ease-in-out transform ${
              card.flipped ? 'bg-purple-300' : 'bg-white hover:scale-105'
            } shadow-lg`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped ? card.image : '❓'}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-xl font-bold text-gray-800">Matched Pairs: {matchedPairs}</p>
        <p className="text-xl font-bold text-red-500">Lives Left: {lives}</p>
        {matchedPairs === cards.length / 2 && (
          <p className="text-green-600 text-2xl font-bold mt-4">You Win! 🎉</p>
        )}
        {gameOver && (
          <p className="text-red-600 text-2xl font-bold mt-4">Game Over! 😢</p>
        )}
        {(matchedPairs === cards.length / 2 || gameOver) && (
          <button
            onClick={initializeGame}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 text-lg"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryMatch;
