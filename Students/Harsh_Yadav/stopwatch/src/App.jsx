import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (milliseconds) => {
    const hrs = Math.floor(milliseconds / 3600000);
    const mins = Math.floor((milliseconds % 3600000) / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const centisecs = Math.floor((milliseconds % 1000) / 10);

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}.${String(centisecs).padStart(2, "0")}`;
  };

  const addLap = () => {
    if (running) {
      setLaps((prev) => [...prev, formatTime(time)]);
    }
  };

  const resetWatch = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-900 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-slate-900/80 backdrop-blur-lg border border-slate-700 shadow-2xl p-8">

        <h1 className="text-center text-4xl font-bold text-white">
          ⏱ Stopwatch
        </h1>

        <div className="mt-8 rounded-2xl bg-black border border-slate-700 p-6 shadow-inner">

          <p className="text-center font-mono text-5xl font-bold tracking-widest text-cyan-400">
            {formatTime(time)}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => setRunning(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
          >
            ▶ Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
          >
            ⏸ Pause
          </button>

          <button
            onClick={resetWatch}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
          >
            ↺ Reset
          </button>

          <button
            onClick={addLap}
            className="bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold"
          >
            🏁 Lap
          </button>

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-3">
            Lap History
          </h2>

          <div className="max-h-56 overflow-y-auto space-y-2">

            {laps.length === 0 ? (
              <p className="text-slate-400 text-center">
                No laps recorded
              </p>
            ) : (
              laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center rounded-lg bg-slate-800 px-4 py-2 text-white"
                >
                  <span>Lap {index + 1}</span>
                  <span className="font-mono text-cyan-300">{lap}</span>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;