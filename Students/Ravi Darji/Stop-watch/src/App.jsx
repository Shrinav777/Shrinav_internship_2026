import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <br />
      <h2>{formatTime()}</h2>
      <div className="button-container">
        <button className="button" onClick={start} disabled={isRunning}>
          Start
        </button>
        <button onClick={stop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
