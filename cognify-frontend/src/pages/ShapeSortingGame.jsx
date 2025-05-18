import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Shapes per level
const shapesLevel1 = [
  { id: 'circle', label: 'Circle', shape: 'circle', color: 'bg-rose-400' },
  { id: 'square', label: 'Square', shape: 'square', color: 'bg-sky-400' },
];

const shapesLevel2 = [
  { id: 'triangle', label: 'Triangle', shape: 'triangle', color: 'bg-lime-400' },
  { id: 'star', label: 'Star', shape: 'star', color: 'bg-amber-400' },
  { id: 'pentagon', label: 'Pentagon', shape: 'pentagon', color: 'bg-indigo-400' },
];

const shapesLevel3 = [
  { id: 'hexagon', label: 'Hexagon', shape: 'hexagon', color: 'bg-purple-400' },
  { id: 'octagon', label: 'Octagon', shape: 'octagon', color: 'bg-pink-400' },
  { id: 'rhombus', label: 'Rhombus', shape: 'rhombus', color: 'bg-teal-400' },
  { id: 'trapezoid', label: 'Trapezoid', shape: 'trapezoid', color: 'bg-orange-400' },
];

const shapesLevel4 = [
  { id: 'ellipse', label: 'Ellipse', shape: 'ellipse', color: 'bg-cyan-400' },
  { id: 'parallelogram', label: 'Parallelogram', shape: 'parallelogram', color: 'bg-yellow-500' },
  { id: 'kite', label: 'Kite', shape: 'kite', color: 'bg-fuchsia-400' },
  { id: 'semicircle', label: 'Semicircle', shape: 'semicircle', color: 'bg-emerald-400' },
];

const playSound = (type) => {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play();
};

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const Shape = ({ shape }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'shape',
    item: { id: shape.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getShapeStyle = () => {
    switch (shape.shape) {
      case 'circle':
        return 'rounded-full';
      case 'triangle':
        return 'clip-triangle';
      case 'star':
        return 'clip-star';
      case 'hexagon':
        return 'clip-hexagon';
      case 'octagon':
        return 'clip-octagon';
      case 'pentagon':
        return 'clip-pentagon';
      case 'rhombus':
        return 'clip-rhombus';
      case 'trapezoid':
        return 'clip-trapezoid';
      case 'ellipse':
        return 'clip-ellipse';
      case 'parallelogram':
        return 'clip-parallelogram';
      case 'kite':
        return 'clip-kite';
      case 'semicircle':
        return 'clip-semicircle';
      default:
        return 'rounded-none';
    }
  };

  return (
    <div
      ref={dragRef}
      className={`w-20 aspect-square md:w-24 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-md cursor-grab ${shape.color} ${getShapeStyle()} ${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`}
    >
      {shape.label}
    </div>
  );
};

const DropZone = ({ shape, onDropShape, matched }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'shape',
    drop: (item) => onDropShape(item.id, shape.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getShapeStyle = () => {
    switch (shape.shape) {
      case 'circle':
        return 'rounded-full';
      case 'triangle':
        return 'clip-triangle';
      case 'star':
        return 'clip-star';
      case 'hexagon':
        return 'clip-hexagon';
      case 'octagon':
        return 'clip-octagon';
      case 'pentagon':
        return 'clip-pentagon';
      case 'rhombus':
        return 'clip-rhombus';
      case 'trapezoid':
        return 'clip-trapezoid';
      case 'ellipse':
        return 'clip-ellipse';
      case 'parallelogram':
        return 'clip-parallelogram';
      case 'kite':
        return 'clip-kite';
      case 'semicircle':
        return 'clip-semicircle';
      default:
        return 'rounded-none';
    }
  };

  return (
    <div
      ref={dropRef}
      className={`w-24 aspect-square md:w-28 border-4 border-dashed flex items-center justify-center transition-colors duration-300 ${getShapeStyle()} ${matched ? 'bg-green-200 border-green-400 shadow-inner' : isOver ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300'}`}
    >
      <span className="text-gray-700 font-semibold text-lg">{shape.label}</span>
    </div>
  );
};

const ShapeSortingGame = () => {
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledShapes, setShuffledShapes] = useState([]);

  const getShapes = () => {
    switch (level) {
      case 1:
        return shapesLevel1;
      case 2:
        return shapesLevel2;
      case 3:
        return shapesLevel3;
      case 4:
        return shapesLevel4;
      default:
        return shapesLevel1;
    }
  };

  const allShapesMatched = () => {
    return getShapes().every((shape) => matches[shape.id] === true);
  };

  const handleDrop = (draggedId, targetId) => {
    const isCorrect = draggedId === targetId;
    if (!matches[targetId]) {
      setMatches({ ...matches, [targetId]: isCorrect });
      setScore(score + (isCorrect ? 10 : -5));
      playSound(isCorrect ? 'success' : 'failure');
    }
  };

  useEffect(() => {
    if (gameOver || levelComplete || gameFinished) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setGameOver(true);
          playSound('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, levelComplete, gameFinished]);

  useEffect(() => {
    setShuffledShapes(shuffleArray(getShapes()));
  }, [level]);

  useEffect(() => {
    if (allShapesMatched()) {
      if (level < 4) {
        setLevelComplete(true);
      } else {
        setGameFinished(true);
        playSound('gameover');
      }
    } else {
      setLevelComplete(false);
    }
  }, [matches, level]);

  const handleNextLevel = () => {
    if (level < 4) {
      setLevel((prev) => prev + 1);
      setMatches({});
      setScore((prev) => prev + 30);
      setTimer((prevTimer) => prevTimer + 15);
      setGameOver(false);
      setLevelComplete(false);
      playSound('levelup');
    }
  };

  const handleGameRestart = () => {
    setMatches({});
    setScore(0);
    setTimer(20);
    setGameOver(false);
    setLevel(1);
    setLevelComplete(false);
    setGameFinished(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-12 px-6 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-6 animate-bounce">
            ✨ Shape Sorter Fun! ✨
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Drag each colorful shape to its matching outline!
          </p>

          <div className="bg-yellow-100 rounded-full py-2 px-4 inline-block mb-4 shadow-sm">
            <span className="text-red-500 font-bold text-xl md:text-2xl">
              ⏱️ {timer}s
            </span>
          </div>

          <div className="bg-green-100 rounded-full py-2 px-4 inline-block mb-6 shadow-sm">
            <span className="text-blue-500 font-bold text-lg md:text-xl">
              Level: {level}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-10">
            {shuffledShapes.map((shape) => (
              <Shape key={shape.id} shape={shape} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            {getShapes().map((shape) => (
              <DropZone
                key={shape.id}
                shape={shape}
                matched={matches[shape.id]}
                onDropShape={handleDrop}
              />
            ))}
          </div>

          <div className="text-xl font-semibold text-indigo-600 mb-8">
            Score: <span className="font-bold text-2xl">{score}</span>
          </div>

          {gameOver && (
            <div className="bg-red-100 rounded-lg p-6 mt-8 shadow-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4 animate-pulse">
                ⏰ Time's Up! ⏰
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Final Score: <span className="font-semibold">{score}</span>
              </p>
              <button
                onClick={handleGameRestart}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors duration-300"
              >
                Play Again!
              </button>
            </div>
          )}

          {gameFinished && (
            <div className="bg-purple-100 rounded-lg p-6 mt-8 shadow-md">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 animate-confetti">
                🎉 You Did It! 🎉
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                You finished all the shape puzzles!
              </p>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                Final Score: {score}
              </p>
              <button
                onClick={handleGameRestart}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors duration-300"
              >
                Play Again!
              </button>
            </div>
          )}

          {!gameOver && levelComplete && level < 4 && (
            <div className="mt-8 animate-fade-in">
              <button
                onClick={handleNextLevel}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
              >
                Next Level! 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default ShapeSortingGame;
