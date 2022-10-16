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
      <h1>React Text to Speech App</h1>
      <button onClick={() => speechHandler(msg)}>NARRATE</button>
      <button onClick={() => cancelNarration(msg)}>Cancel Talk</button>
    </div>
  );
}
