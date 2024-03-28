import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  const [enteredName, setEnteredName] = useState("");

  const playerName = useRef();

  function handleClick(e) {
    setEnteredName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ? enteredName : "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
