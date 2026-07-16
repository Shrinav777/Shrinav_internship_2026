import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
  };

  const formatTime = () => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + Math.floor((time / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#282c34', color: 'white' }}>
      <h1>STOPWATCH</h1>
      <div style={{ fontSize: '4rem', margin: '20px', letterSpacing: '2px', background: '#333', padding: '10px 30px', borderRadius: '10px' }}>
        {formatTime()}
      </div>
      <div>
        <button onClick={startTimer} style={{ padding: '10px 20px', margin: '10px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>Start</button>
        <button onClick={stopTimer} style={{ padding: '10px 20px', margin: '10px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>Stop</button>
        <button onClick={resetTimer} style={{ padding: '10px 20px', margin: '10px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px' }}>Reset</button>
      </div>
    </div>
  );
}

export default App;