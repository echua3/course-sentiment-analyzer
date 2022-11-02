import React from "react";
import Navbar from "./Navigation/Navbar.js";
import HomePage from "./Pages/HomePage.js";
import CourseSearch from "./Pages/CourseSearch.js";
import Recommendations from "./Pages/Recommendations.js";
import UserProfile from "./Pages/UserProfile.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Courses" element={<CourseSearch />} />
          <Route path="/Recommendations" element={<Recommendations />} />
          <Route path="/Profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App