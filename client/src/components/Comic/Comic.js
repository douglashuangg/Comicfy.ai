import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./comic.css";
import axios from "axios";

const Comic = () => {
  let data = useLocation();
  const { labels, emotion } = data.state;
  const [captions, setCaptions] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  return (
    <>
      {/* {labels && <div>{labels}</div>}
      {emotion && <div>{emotion}</div>} */}

      {!isLoading && (
        <div className="comic">
          <div className="row1">
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${captions[0]})` }}
            >
              <div className="caption">
                Six years on, Corlys Velaryon, Lord of the Driftmark, is
                severely wounded fighting in the Stepstones.
              </div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${captions[1]})` }}
            >
              <div className="caption">
                His brother, Ser Vaemond, petitions King's Landing to name him
                as Corlys' heir, proclaiming Rhaenyra's son, Lucerys
                illegitimate.
              </div>
            </div>
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${captions[2]})` }}
            >
              <div className="caption">
                Rhaenyra and Daemon return to the capital to defend Lucerys'
                claim.
              </div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="row2">
            <div
              className="small-panel-l"
              style={{ backgroundImage: `url(${captions[3]})` }}
            >
              <div className="caption">
                They find King Viserys is bedridden, disfigured, and mentally
                muddled.
              </div>
            </div>
            <div
              className="small-panel-u"
              style={{ backgroundImage: `url(${captions[4]})` }}
            >
              <div className="caption">
                Daemon beheads Vaemond when he denounces Rhaenyra as a whore and
                her children bastards.
              </div>
            </div>
            <div
              className="big-panel"
              style={{ backgroundImage: `url(${captions[5]})` }}
            >
              <div className="caption">
                Queen Alicent and Ser Otto Hightower now oversee all royal
                matters.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comic;
