import React, { useState } from "react";

export default function Speech(props) {
  const msg = new SpeechSynthesisUtterance();
  const [play, setPlay] = useState(true);

  const speechHandler = (msg) => {
    if (play) {
      msg.text = props.labels.join(". ");
      window.speechSynthesis.speak(msg);
      window.speechSynthesis.resume(msg);
      setPlay(!play);
    } else {
      window.speechSynthesis.pause(msg);
      console.log(play);
      setPlay(!play);
    }
  };

  return (
    <div className="App">
      <button onClick={() => speechHandler(msg)}>Narrate</button>
    </div>
  );
}
