import React from "react";
import Navbar from "./Navigation/Navbar.js";
import HomePage from "./Pages/HomePage.js";
import CourseSearch from "./Pages/CourseSearch.js";
import Recommendations from "./Pages/Recommendations.js";
import UserProfile from "./Pages/UserProfile.js";
import UserProfileForm from "./components/UserProfileForm.js";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.js";
import LogoutPage from "./Pages/LogoutPage.js";

function App() {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Courses" element={<CourseSearch />} />
          <Route path="/Recommendations" element={<Recommendations />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/ProfileEdit" element={<UserProfileForm />} />
          <Route path="/Logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App
