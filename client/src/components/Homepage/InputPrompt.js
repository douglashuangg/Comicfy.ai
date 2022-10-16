import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function InputPrompt() {
  const [prompt, setPrompt] = useState();
  const [captions, setCaptions] = useState([]);
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const saveData = async () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/analyze", { paragraph: prompt })
      .then((response) => {
        console.log(response);
        setSentiment(response.data.overall_sentiment);
        setCaptions(response.data.sentences);
        setLoading(false);
        setReady(true);
      })
      // .then(() => setCaptions)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="center">
        <h1
          style={{
            fontSize: "100px",
            fontWeight: "bold",
            // backgroundColor: "black",
            marginTop: "30px",
          }}
        >
          COMICFY.AI
        </h1>
        <h2>
          An AI powered visual experience that brings your stories to life!
        </h2>
      </div>
      <div className="box">
        <textarea
          placeholder="Enter your story here:"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          rows="20"
          cols="100"
          style={{ marginBottom: "60px" }}
        ></textarea>

        <div className="two-buttons">
          <div>
            <Button variant="secondary btn-length" onClick={saveData}>
              {loading && (
                <Spinner
                  as="span"
                  role="status"
                  aria-hidden="true"
                  animation="border"
                />
              )}
              {!loading && "Analyze"}
            </Button>
          </div>
          <div>
            <Link
              className={
                "btn btn-secondary btn-length custom-btn " +
                (!ready ? "disabled" : "")
              }
              to="/comic"
              state={{ labels: captions, emotion: sentiment }}
              style={{ marginTop: "10px" }}
            >
              Generate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
