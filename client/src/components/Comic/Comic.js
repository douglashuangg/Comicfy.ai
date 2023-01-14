import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./comic.css";
import axios from "axios";
import { Howl, Howler } from "howler";
import joyfulSong from "../../assets/songs/joyful.mp3";
import angrySong from "../../assets/songs/angry.mp3";
import sadSong from "../../assets/songs/sad.mp3";
import scarySong from "../../assets/songs/scary.mp3";
import Speech from "./Speech";
import "bootstrap/dist/css/bootstrap.min.css";

const Comic = () => {
  let data = useLocation();
  const { labels, emotion } = data.state;
  const [urls, setUrls] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saveData = async () => {
      axios
        .post("http://127.0.0.1:8000/generate", {
          sentences: labels,
        })
        .then((response) => {
          setUrls(response.data.image_urls);
          console.log(response);
          setLoading(false);
        })
        // .then(() => seturls)
        .catch((err) => console.log(err));
    };
    saveData();
  }, []);

  console.log(urls);

  const playTheme = () => {
    if (sound) {
      return sound.playing() ? sound.pause() : sound.play();
    }

    if (emotion === "joyful") {
      setSound(new Howl({ src: [joyfulSong] }));
    } else if (emotion === "angry") {
      setSound(new Howl({ src: [angrySong] }));
    } else if (emotion === "sad") {
      setSound(new Howl({ src: [sadSong] }));
    } else {
      setSound(new Howl({ src: [scarySong] }));
    }

    Howler.volume(0.35);
  };

  useEffect(() => {
    if (sound) {
      sound.play();
    }
  }, [sound]);

  return (
    <>
      <div className="center">
        <h2>COMICFY.AI</h2>
        <h4>
          An AI powered visual experience that brings your stories to life.
        </h4>
      </div>

      {isLoading && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "100vh",
            }}
          >
            <div className="loader"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="comic">
          <div className="audio-btns">
            <div className="back-btn">
              <button onClick={() => navigate(-1)} className="non-audio">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div>
              <button onClick={playTheme} className="audio">
                <i class="fa-solid fa-music"></i>{" "}
              </button>
              <Speech labels={labels} />
            </div>
          </div>

          <div className="row1">
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${urls[0]})` }}
            >
              <div className="caption">{labels[0]}</div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${urls[1]})` }}
            >
              <div className="caption">{labels[1]}</div>
            </div>
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${urls[2]})` }}
            >
              <div className="caption">{labels[2]}</div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="row2">
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${urls[3]})` }}
            >
              <div className="caption">{labels[3]}</div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${urls[4]})` }}
            >
              <div className="caption">{labels[4]}</div>
            </div>
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${urls[5]})` }}
            >
              <div className="caption">{labels[5]}</div>
            </div>
          </div>
        </div>
      )}
      <div className="spacer"></div>
    </>
  );
};

export default Comic;
