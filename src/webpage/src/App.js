import React from "react";
import Navbar from "./Navigation/Navbar.js";
import HomePage from "./components/HomePage.js";
import CourseSearch from "./components/CourseSearch.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/HomePage" component={<HomePage/>} />
          <Route path="/Courses" component={<CourseSearch/>} />
          <Route path="/Recommendations" />
        </Routes>
      </div>
    </Router>
  );
}