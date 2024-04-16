import { forwardRef, useImperativeHandle, useRef } from "react"; // Pass ref from one component to another

export const ResultModal = forwardRef(function (
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  // targetTime -> seconds
  // remainingTime -> miliseconds
  const userLost = remainingTime <= 0;
  const formattedTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // Expose callable function from this component
  // Connects with outer component ref such that outer component can call the method existing in this hook. The objective is to detach functionality for outer components.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedTime} seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});
