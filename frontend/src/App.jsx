import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Identify from "./components/Identify";
import Describe from "./components/Describe";
import Trace from "./components/Trace";
import Results from "./components/Results";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Identify />} />
        <Route path="/describe" element={<Describe />} />
        <Route path="/trace" element={<Trace />} />
        <Route path="/results" element={<Results />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </Router>
  );
}

export default App;
