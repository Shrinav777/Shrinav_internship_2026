import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Stopwatch
        </h1>

        <div className="text-5xl font-mono font-bold text-blue-600 mb-8">
          {minutes}:{seconds}:{milliseconds}
        </div>

        <div className="flex justify-center gap-8">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            Stop
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;