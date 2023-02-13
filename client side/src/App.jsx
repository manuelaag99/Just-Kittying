import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";

const App = () => {
  return <div>
    <Router>
      <Routes>
        <Route path="/Home" element={<Homepage />} />
      </Routes>
    </Router>
  </div>
}

export default App
