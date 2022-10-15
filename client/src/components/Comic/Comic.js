import React from 'react'
import {useLocation} from "react-router-dom";

const Comic = () => {
    let data = useLocation();
    const { labels, emotion } = data.state;

    console.log(labels)
    console.log(emotion)
  return (
    <div>S</div>
  )
}

export default Comic