import "./App.css";
import Home from "./components/Homepage/Home";
import Comic from "./components/Comic/Comic";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/comic" element={<Comic />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
