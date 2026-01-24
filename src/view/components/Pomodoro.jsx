// PomodoroTimer.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer () {
  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          toggleMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(isWorkMode ? WORK_DURATION : BREAK_DURATION);
  };

  const toggleMode = () => {
    const nextMode = !isWorkMode;
    setIsWorkMode(nextMode);
    setTimeLeft(nextMode ? WORK_DURATION : BREAK_DURATION);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Pomodoro Timer</h1>
      <h2>{isWorkMode ? 'Work Time' : 'Break Time'}</h2>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
      <div style={styles.buttons}>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '2rem',
    background: '#fefefe',
    color: '#333',
  },
  timer: {
    fontSize: '4rem',
    margin: '1rem 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
};
