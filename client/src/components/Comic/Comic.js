import React from "react";
import { useLocation } from "react-router-dom";

const Comic = () => {
  let data = useLocation();
  const { labels, emotion } = data.state;

  return (
    <>
      {labels && <div>{labels}</div>}
      {emotion && <div>{emotion}</div>}
    </>
  );
};

export default Comic;
