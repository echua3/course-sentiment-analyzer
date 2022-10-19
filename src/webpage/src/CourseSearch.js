import "./index.css";
import "./components/Searchbar";
import "./components/WriteReview";
import "./components/CourseTable";
import SearchBar from "./components/Searchbar";


import React from "react";

function CourseSearch() {

  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}
export default CourseSearch;
