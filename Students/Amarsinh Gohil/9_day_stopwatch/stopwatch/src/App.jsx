import { useState, useRef, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSeconds(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">⏱ Stopwatch</h1>

        <p className="text-gray-300 mb-8">React + Tailwind CSS</p>

        <div className="w-56 h-56 mx-auto rounded-full border-8 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-8">
          <h2 className="text-4xl font-bold text-white tracking-widest">
            {hrs}:{mins}:{secs}
          </h2>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            ▶ Start
          </button>

          <button
            onClick={stopTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            ⏸ Stop
          </button>

          <button
            onClick={resetTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
