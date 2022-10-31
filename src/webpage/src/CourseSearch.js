import "./index.css";
import "./components/Searchbar";
import "./components/WriteReview";
import "./components/CourseTable";
import SearchBar from "./components/Searchbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";


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
