import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");

  return (
    <div className="container">
      <h1>Digital Stopwatch</h1>

      <div className="time">
        {minutes}:{seconds}:{milliseconds}
      </div>

      <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>

        <button onClick={() => setRunning(false)}>Stop</button>

        <button
          onClick={() => {
            setRunning(false);
            setTime(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;