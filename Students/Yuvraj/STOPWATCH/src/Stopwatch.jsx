import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {

        if (isRunning) {

            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);

        } else {

            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);

    }, [isRunning]);

    function start() {
        setIsRunning(true);
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setTime(0);
    }

    function formatTime() {

        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0") +
            ":" +
            String(milliseconds).padStart(2, "0")
        );
    }

    return (

        <div className="stopwatch">

            <h1>{formatTime()}</h1>

            <div className="buttons">

                <button onClick={start}>Start</button>

                <button onClick={stop}>Stop</button>

                <button onClick={reset}>Reset</button>

            </div>

        </div>

    );
}

export default Stopwatch;