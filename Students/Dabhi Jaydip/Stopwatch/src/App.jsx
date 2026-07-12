import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // State variables configuration metrics
  const [time, setTime] = useState(0); // Tracks time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Tracks status of timer
  const timerRef = useRef(null); // Reference hook configuration to clear interval tracking variables

  // Side-effect hook mapping lifecycle to track status intervals
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    
    // Memory safe clean-up routine method execution
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // UI rendering methods formats calculator configurations
  const formatTime = () => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    // Padding formats strings values safely
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    const displayMilliseconds = String(milliseconds).padStart(2, '0');

    return `${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
  };

  return (
    <div className="stopwatch-root">
      <div className="stopwatch-card">
        <h2>React Stopwatch Project</h2>
        
        {/* Core numbers indicator tracker display matrix block */}
        <div className="stopwatch-display">
          {formatTime()}
        </div>

        {/* Action controls button layout rows elements rendering block */}
        <div className="stopwatch-controls">
          {!isRunning && time === 0 && (
            <button className="btn-start" onClick={() => setIsRunning(true)}>Start</button>
          )}
          {isRunning && (
            <button className="btn-stop" onClick={() => setIsRunning(false)}>Stop</button>
          )}
          {!isRunning && time > 0 && (
            <button className="btn-resume" onClick={() => setIsRunning(true)}>Resume</button>
          )}
          <button className="btn-reset" onClick={() => setTime(0) || setIsRunning(false)}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
