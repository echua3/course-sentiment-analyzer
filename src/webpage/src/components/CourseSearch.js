import "../index.css";
import "./Searchbar";
import "./WriteReview";
import "./CourseTable";
import SearchBar from "./Searchbar";
import Navbar from "../Navigation/Navbar.js";


import React from "react";

function CourseSearch() {

  return (
    <div className="App">
      <Navbar />
      <SearchBar />
    </div>
  );
}
export default CourseSearch;
