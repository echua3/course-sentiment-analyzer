import "../index.css";
// import "../components/UserProfileData";
import UserProfileForm from "../components/UserProfileForm";
import UserProfileData from "../components/UserProfileData";
import UserReviews from "../components/UserReviews";
import React from "react";

function UserProfile() {

  if (window.userID != "") {
    return (
      <div className="UserProfile">
        <UserProfileData />
        <UserReviews />
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
