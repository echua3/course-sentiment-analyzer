import React, { useEffect } from "react";
import './style/css/CourseComponent.scss';

function Upvote({reviewID}) {

    const requestData = async () =>{
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/upvote/" + reviewID, {
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
            // const records = await response.json();
            // console.log(records);
            // const basicMessage = records.error.message.split(/:(.*)/s)
            // const allErrors = basicMessage[1].split(",")
            // console.log(allErrors)
            // allErrors.forEach(runErrorMessaging);
            console.log('!response.ok')
        } else {
            console.log(response)
        }
    }
    requestData();


    //     useEffect( () => {
    //     async function upvote() {
    //         const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/upvote/" + {record}._id)
    //         if(!response.ok) {
    //           const message = "An error occurred"
    //           console.log("Error:" + response.statusText);
    //           return;
    //         }
    //          console.log(response);
    //         const records = await response.json();
    //         console.log(records.data);
            
    //     }   
    //     upvote();

    //     return;
    // }, [recordValues.length]);

}

export default Upvote