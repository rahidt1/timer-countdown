import { useRef, useState } from "react";
import { ResultModal } from "./ResultModal";

export function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  
  // targetTime -> seconds
  // remainingTime -> miliseconds
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const isTimerActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  // Start timer
  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
  }

  // Stop timer using stop button
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  // Stop timer when time expires
  if (remainingTime <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
