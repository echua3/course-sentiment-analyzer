import "../index.css";
import UserProfileData from "../components/UserProfileData";
import UserReviews from "../components/UserReviews";
import React from "react";
import { useEffect, useState } from "react";

function UserProfile(props) {
  const [actualID, setActualID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
      if(!responseValue.ok) {
            console.log("Error:" + responseValue.statusText);
            window.userID = "";
            return;
      }
      const records2 = await responseValue.json();
      console.log(records2.data.userId);
      setActualID(records2.data.userId);
      window.userID = actualID;
    }
    fetchData().catch(console.error);
  })

  if (actualID != "") {
    return (
      <div className="UserProfile">
        <UserProfileData actualID = {actualID}/>
        <UserReviews actualID = {actualID}/>
      </div>
    );
  } else {
    return (
      <div className="Profile">
        <span class="writereview-form-title">
          Please login to view your profile.
        </span>
      </div>
    );
  }
}
export default UserProfile;
