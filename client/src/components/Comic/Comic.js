import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./comic.css";
import axios from "axios";
import { Howl, Howler  } from 'howler'
import tempSound from './joyful.mp3'

const Comic = () => {
  let data = useLocation();
  const { labels, emotion } = data.state;
  const [captions, setCaptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  useEffect(() => {
    const saveData = async () => {
      axios
        .post("http://127.0.0.1:8000/generate", {
          sentences: labels,
        })
        .then((response) => {
          setCaptions(response.data.image_urls);
          console.log(response);
          setLoading(false);
        })
        // .then(() => setCaptions)
        .catch((err) => console.log(err));
    };
    saveData();
  }, []);

  console.log(captions);

  const playTheme = () => { 
    setSound(new Howl({ src: [tempSound] }));
    Howler.volume(1.0);
  }

  useEffect(() => {
    if (sound) { 
      sound.play();
    }
  }, [sound])

  return (
    <>
      {/* {labels && <div>{labels}</div>}
      {emotion && <div>{emotion}</div>} */}

      <button onClick={playTheme} className='button'>Button</button>

      {!isLoading && (
        <div className="comic">
          <div className="row1">
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${captions[0]})` }}
            >
              <div className="caption">{labels[0]}</div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${captions[1]})` }}
            >
              <div className="caption">{labels[1]}</div>
            </div>
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${captions[2]})` }}
            >
              <div className="caption">{labels[2]}</div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="row2">
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${captions[3]})` }}
            >
              <div className="caption">{labels[3]}</div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${captions[4]})` }}
            >
              <div className="caption">{labels[4]}</div>
            </div>
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${captions[5]})` }}
            >
              <div className="caption">{labels[5]}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comic;
