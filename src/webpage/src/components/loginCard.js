import React from "react";
import './style/css/CourseComponent.scss';
import { useEffect, useState } from "react";


function LoginCard() {

  const [userID, setUserID] = useState("");
  const [actualID, setActualID] = useState("");
  const [userErrorBoolean, setUserErrorBoolean] = useState(false);

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

  const onSubmit = async (e)=> {
    e.preventDefault();
    loginFunction(e)
  }
  
  async function loginFunction(e) {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/login/" + userID, { credentials: 'include'})
    if(!response.ok) {
          if(response.statusText == "Internal Server Error") {
            setUserErrorBoolean(true);
          }
          console.log("Error:" + response.statusText);
          return;
    }
    const records = await response.json()
    console.log(records.data)

    const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
    if(!responseValue.ok) {
          console.log("Error:" + responseValue.statusText);
          window.userID = "";
          return;
    }
    const records2 = await responseValue.json()
    console.log(records2.data)
    setActualID(records2.data.userId);
    window.userID = actualID;
  }

  if(actualID == "" || actualID == null) {
  return (
    <div class="box-form">
    <div class="left">
       <div class="overlay">
       <span class="writereview-form-title-2">
            Your personal catalogue for courses is only a few keystrokes away!
       </span>
       <div class="wrap-input1 center-fold image-center">
       <img
                    class="center-fold"
                    className="block lg:hidden h-10 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                    alt="HopCourses"
                  />
                  <img
                    class="center-fold"
                    className="hidden lg:block h-10 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                    alt="HopCourses"
                  />
       </div>
      </div>
    </div>
  </div>

    )
  } else {
    return (
      <div class="box-form">
      <div class="left">
         <div class="overlay">
         <span class="writereview-form-title-2">
                Your personal catalogue for courses is only a few keystrokes away!
         </span>
         <div class="wrap-input1 center-fold image-center">
         <img
                      class="center-fold"
                      className="block lg:hidden h-10 w-auto"
                      src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                      alt="HopCourses"
                    />
                    <img
                      class="center-fold"
                      className="hidden lg:block h-10 w-auto"
                      src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                      alt="HopCourses"
                    />
         </div>
        </div>
      </div>      
    </div>
    )
  }
  };

export default LoginCard;
