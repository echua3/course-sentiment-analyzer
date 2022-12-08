import "../index.css";
import UserProfileData from "../components/UserProfileData";
import UserReviews from "../components/UserReviews";
import React from "react";

function UserProfile({actualID}) {

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
