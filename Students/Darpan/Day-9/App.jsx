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
    <div className="min-h-screen flex justify-center items-center bg-gray-200">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-96">

        <h1 className="text-3xl font-bold mb-6">
          Stop Watch
        </h1>

        <h2 className="text-5xl font-bold mb-8">
          {hrs}:{mins}:{secs}
        </h2>

        <div className="flex justify-center gap-4">

          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>

          <button
            onClick={stopTimer}
            className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
          >
            Stop
          </button>

          <button
            onClick={resetTimer}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;