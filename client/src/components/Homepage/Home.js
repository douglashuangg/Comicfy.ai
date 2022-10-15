import "./Home.css";
import InputPrompt from "./InputPrompt";
import {Route, Routes } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <InputPrompt />
    </div>
  );
}

export default Home;
