import React from "react";
import './style/css/CourseComponent.scss';
import { useEffect, useState } from "react";

const { Card, Grid } = "antd";


function LogoutCard() {

  useEffect( () => {
    logoutFunction()
    return;
  }, []);

  
  async function logoutFunction() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/logout", { credentials: 'include'})
    if(!response.ok) {
          const message = "An error occured"
          console.log("Error:" + response.statusText);
          return;
    }
  }

  return;
}



export default LogoutCard;
