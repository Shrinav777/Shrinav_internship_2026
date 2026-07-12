import { useState, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Add Lap
  const addLap = () => {
    if (time > 0) {
      setLaps([...laps, formatTime(time)]);
    }
  };

  // Format Time
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(milliseconds).padStart(2, "0")
    );
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

      <h1 className="text-4xl font-bold text-center mb-8">
        Stopwatch
      </h1>

      <div className="text-5xl font-mono text-center mb-8">
        {formatTime(time)}
      </div>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={startTimer}
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
        >
          Start
        </button>

        <button
          onClick={pauseTimer}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg"
        >
          Pause
        </button>

        <button
          onClick={addLap}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
        >
          Lap
        </button>

        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
        >
          Reset
        </button>

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-3">
          Lap Times
        </h2>

        <div className="max-h-52 overflow-y-auto">

          {laps.length === 0 ? (
            <p className="text-gray-500">
              No Lap Recorded
            </p>
          ) : (
            laps.map((lap, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2"
              >
                <span>Lap {index + 1}</span>
                <span>{lap}</span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Stopwatch;