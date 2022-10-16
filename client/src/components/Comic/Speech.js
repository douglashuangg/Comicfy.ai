import React, { useState } from "react";
// import "../style.css";

export default function Speech(props) {
  const msg = new SpeechSynthesisUtterance();
  const [play, setPlay] = useState(true);
  const [firstTimePlay, setFirstTime] = useState(true);
  const speechHandler = (msg) => {
    if (play) {
      msg.text = props.labels.join(". ");
      if (firstTimePlay) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
      } else {
        console.log(firstTimePlay);
        window.speechSynthesis.resume(msg);
      }

      setPlay(!play);
      setFirstTime(false);
    } else {
      window.speechSynthesis.pause(msg);
      setPlay(!play);
      setFirstTime(false);
    }
  };

  return (
    <div className="App">
      <button onClick={() => speechHandler(msg)}>Narrate</button>
    </div>
  );
}
