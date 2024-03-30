import { forwardRef, useImperativeHandle, useRef } from "react"; // Pass ref from one component to another

export const ResultModal = forwardRef(function ({ result, targetTime }, ref) {
  const dialog = useRef();

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
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});
