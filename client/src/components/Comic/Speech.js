import React, { useState } from "react";
// import "../style.css";

export default function Speech(props) {
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.text = props.labels.join(". ");
    window.speechSynthesis.speak(msg);
  };

  const cancelNarration = (msg) => {
    window.speechSynthesis.cancel(msg);
  };

  return (
    <div className="App">
      <button onClick={() => speechHandler(msg)}>NARRATE</button>
      <button onClick={() => cancelNarration(msg)}>Cancel Talk</button>
    </div>
  );
}
