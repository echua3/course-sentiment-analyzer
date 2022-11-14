import "../index.css";
import "../components/UserProfileData";
import UserProfileData from "../components/UserProfileData";
import UserReviews from "../components/UserReviews";
import React from "react";

function UserProfile() {
  return (
    <div className="UserProfile">
      <UserProfileData />
      <UserReviews />
    </div>
  );
}
export default UserProfile;
