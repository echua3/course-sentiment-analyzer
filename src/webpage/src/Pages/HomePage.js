import "../index.css";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="HomePage">
      <div className="container">
        <div className="txt">
          <h1 className='title'>Welcome to HopCourses</h1>
          <p>We built this website so that you can find the right courses for you!</p>
          <div className="btn">
              <Link to='/Courses'>
                 <h2>Explore courses</h2>
                 <p>Read and write reviews for classes</p>
                 <p className='pline2'>Checkout our review sentiment analysis of different courses to find the right courses for you</p>
              </Link>
              <Link to='/Recommendations'>
                 <h2>Courses recommended for you</h2>
                 <p className='p3'>View your personalized course recommendations</p>
              </Link>
          </div>
        </div>
        <div className="homepageImg">
          <img
            className="homepage_img2"
            src="homepagePic3.jpg"
            alt="HopCourses"
          />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
