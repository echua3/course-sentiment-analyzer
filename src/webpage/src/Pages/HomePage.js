import "../index.css";
import React from "react";
import HomepageCard from "../components/HomepageCard";

function HomePage() {

  return (
    <div className="HomePage">

      <h1 className='title'>Welcome to HopCourses</h1>
      <div className="homepage">
        <img
          className="homepage_img2"
          src="homepagePic3.jpg"
          alt="HopCourses"
        />
      </div>
      {/* <div>
        <HomepageCard />
      </div> */}

    </div>
  );
}
export default HomePage;
