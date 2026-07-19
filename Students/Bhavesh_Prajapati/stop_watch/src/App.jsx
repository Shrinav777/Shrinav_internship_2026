import { useState, useEffect } from "react";

function App() {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {

    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [running]);

  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (

    <div className="bg-gray-900 h-screen flex justify-center items-center">

      <div className="bg-white p-10 rounded-xl shadow-xl text-center">

        <h1 className="text-4xl font-bold mb-6">
          Stopwatch
        </h1>

        <h2 className="text-5xl font-bold mb-8">
          {hours}:{minutes}:{seconds}
        </h2>

        <div className="flex gap-4 justify-center">

          <button
            onClick={() => setRunning(true)}
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
          >
            Stop
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(0);
            }}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
          >
            Reset
          </button>

        </div>

      </div>

    </div>

  );
}

export default App;