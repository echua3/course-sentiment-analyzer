import React, { useEffect } from "react";
import './style/css/CourseComponent.scss';

function Upvote(reviewID, userID) {

    console.log("URL: ", process.env.REACT_APP_API_ENDPOINT + "/review/upvote/" + reviewID + "/" +  userID);

    const requestData = async () =>{
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/upvote/" + reviewID + "/" + userID, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        if(!response.ok) {
            console.log('!response.ok')
        } else {
            console.log(response)
        }
    }
    requestData();

}

export default Upvote