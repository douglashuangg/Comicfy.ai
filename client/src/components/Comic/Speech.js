import React, { useState } from "react";
// import "../style.css";
import "./comic.css";

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
    <button onClick={() => speechHandler(msg)} className="audio">
      <i class="fa-solid fa-comment"></i>
    </button>
  );
}
