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
import { useEffect, useState } from "react";

function App() {
  window.userID = "";

  useEffect(() => {
    const fetchData = async () => {
      const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
      if(!responseValue.ok) {
            const message = "An error occured"
            console.log("Error:" + responseValue.statusText);
            window.userID = "";
            return;
      }
      const records2 = await responseValue.json();
      console.log(records2.data.userId);
      window.userID = records2.data.userId;
    }
    fetchData().catch(console.error);
  })

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
