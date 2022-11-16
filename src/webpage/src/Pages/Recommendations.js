import "../index.css";
import React from "react";
import RecommendationsTable from "../components/RecommendationsTable";

function Recommendations() {

  if (window.userID != "") {
    return (
      <div className="Recommendations">
        <RecommendationsTable />
      </div>
    );
  } else {
    return (
      <div className="Recommendations">
        <span class="writereview-form-title">
          Please login to view your course recommendations.
        </span>
      </div>
    );
  }
}
export default Recommendations;
