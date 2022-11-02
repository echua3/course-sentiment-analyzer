import "../index.css";
import React from "react";
import "./Style/Homepage.css";
import HomepageCard from "../components/HomepageCard";

function HomePage() {
  const imageName = 'homepagePic3.jpg';

  return (
    <div className="HomePage">

      <h1 className='title'>Welcome to HopCourses</h1>
      <div className="homepage">
        <div style={{ backgroundImage: `url('/${imageName}'})` }}>
        </div>
        {/* <img src={`/${imageName}`} /> */}
        
        {/* <img
          className="homepage_img2"
          src="homepagePic3.jpg"
          alt="HopCourses"
        /> */}
      </div>
      {/* <div>
        <HomepageCard />
      </div> */}

    </div>
  );
}
export default HomePage;
