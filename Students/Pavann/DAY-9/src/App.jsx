import { useState, useRef, useEffect } from "react";

function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (running) {
      setLaps((prev) => [...prev, formatTime(elapsedTime)]);
    }
  };

  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const ms = String(Math.floor((time % 1000) / 10)).padStart(2, "0");

    return `${hrs}:${mins}:${secs}:${ms}`;
  };

  return (
    <div className="screen">

      <div className="card">

        <h1>⏱ Modern Stopwatch</h1>

        <div className="status">
          {running ? "🟢 Running" : "🔴 Paused"}
        </div>

        <div className="timer">
          {formatTime(elapsedTime)}
        </div>

        <div className="buttons">

          {!running ? (
            <button className="start" onClick={handleStart}>
              Start
            </button>
          ) : (
            <button className="pause" onClick={handlePause}>
              Pause
            </button>
          )}

          <button className="lap" onClick={handleLap}>
            Lap
          </button>

          <button className="reset" onClick={handleReset}>
            Reset
          </button>

        </div>

        <div className="laps">

          <h2>Lap Times</h2>

          {laps.length === 0 ? (
            <p>No laps recorded</p>
          ) : (
            laps.map((lap, index) => (
              <div className="lapItem" key={index}>
                Lap {index + 1}
                <span>{lap}</span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;