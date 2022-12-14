import React from "react";
import './style/css/CourseComponent.scss';
import { useEffect } from "react";
import { Navigate } from 'react-router';


function LogoutCard() {

  useEffect( () => {
    logoutFunction();
    return;
  }, []);

  
  async function logoutFunction() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/Logout", { credentials: 'include'})
    if(!response.ok) {
          console.log("Error:" + response.statusText);
          return;
    }
  }

  return (
    <Navigate to='/'/>
  );
}



export default LogoutCard;
