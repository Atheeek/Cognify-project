import React, { useRef, useState } from 'react';

const ColoringPage = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [isErasing, setIsErasing] = useState(false);
  const [history, setHistory] = useState([]); // For undo feature

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = isErasing ? '#FFFFFF' : color;
    ctx.lineWidth = isErasing ? 20 : 6; // 🧹 Big eraser
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas.isDrawing) {
      const ctx = canvas.getContext('2d');
      setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }
    canvas.isDrawing = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]); // Clear undo history
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const undo = () => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const newHistory = [...history];
      newHistory.pop(); // Remove last action
      const last = newHistory[newHistory.length - 1];
      if (last) {
        ctx.putImageData(last, 0, 0);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setHistory(newHistory);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Create a temporary canvas to add white background
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
  
    // Fill white background
    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  
    // Draw the original canvas on top
    tempCtx.drawImage(canvas, 0, 0);
  
    // Now download
    const link = document.createElement('a');
    link.download = 'cognify-drawing.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-6">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">🎨 Digital Coloring</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setIsErasing(false);
          }}
          className="w-12 h-12 rounded-full border-2 border-gray-400 shadow-md cursor-pointer"
          title="Pick a color"
        />
        <button
          onClick={toggleEraser}
          className={`px-4 py-2 rounded-xl text-white ${
            isErasing ? 'bg-gray-600' : 'bg-purple-500 hover:bg-purple-600'
          }`}
        >
          {isErasing ? 'Drawing Mode' : 'Eraser'}
        </button>
        <button
          onClick={undo}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Undo
        </button>
        <button
          onClick={clearCanvas}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
        >
          Clear
        </button>
        <button
          onClick={saveDrawing}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl"
        >
          Save
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border-4 border-gray-400 bg-white rounded-2xl shadow-xl cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default ColoringPage;
