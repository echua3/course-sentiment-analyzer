import "../index.css";
import RecommendationsTable from "../components/RecommendationsTable";
import React, { useEffect, useState } from "react";

function Recommendations() {
  const [actualID, setActualID] = useState("");
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
      console.log(records2.data.userId);
      setActualID(records2.data.userId);
    }
    fetchData().catch(console.error);
  })
  
  if (actualID != "") {
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
