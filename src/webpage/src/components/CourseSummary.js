import React from "react";
import { useState,useEffect} from "react";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";
// import DifficultyPieChart from './DifficultyPieChart.js';
// import SentimentPieChart from './SentimentPieChart.js';
// var difficulty_list = new Array(5).fill(0);
// var sentiment_list = new Array(3).fill(0);
// export{difficulty_list};
// export{sentiment_list};

// function getStars(par1) {
//    var star = "Difficulty : ";
//    var stars = "⭐";
//    var result="";
//    if(isNaN(par1)) {
//       result = "N/A";
//    }
//    else {
//       for(let i=0; i<Math.round(par1); i++)
//       {
//          //console.log('Value of i is:'+i)
//          result = result.concat(stars);
//          //console.log('Stars is'+result)
//       }  
//    }
//    result = star.concat(result)
//    return result;
// }

// function getEmoji(par2){
//    var happy = "😁";
//    var sad = "😭";
//    var neutral = "😐";
//    var nodata = "N/A";
//    if (par2<0){
//       return happy;  
//    }
//    else if (par2>0){
//       return sad;
//    }
//    else if (par2==0){
//       return neutral;
//    }
//    else {
//       return nodata;
//    }

// }
// var sentiment_score = 0;
// var average_difficulty = 0;
// var average_sentiment_score;
function CourseSummary({record}) {
    const [Title, setTitle] = useState({record}.record.Title);
    const instructorsFullName = {record}.record.InstructorsFullName
    const [recordValues, setRecords] = useState([]);
    const offeringName = {record}.record.OfferingName;
    const courseDescription = {record}.record.Description;
    const sectionName = {record}.record.SectionName;
    const term = {record}.record.Term;
    useEffect( () => {
      async function getRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID)
          if(!response.ok) {
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setRecords(records.data);
         //  sentiment_score = 0;
         //  average_difficulty=0;
         //  difficulty_list.fill(0);
         //  sentiment_list.fill(0);
         //  for(let i=0; i<recordValues.length; i++)
         //  {
         //    sentiment_score = sentiment_score +recordValues[i].score;
         //    average_difficulty=average_difficulty+recordValues[i].difficulty;
         //    switch(recordValues[i].difficulty)
         //    {
         //       case 1:
         //          difficulty_list[0] = difficulty_list[0]+1;
         //          break;
         //       case 2:
         //           difficulty_list[1] = difficulty_list[1]+1;
         //           break;
         //       case 3:
         //          difficulty_list[2] = difficulty_list[2]+1;
         //          break;
         //       case 4:
         //          difficulty_list[3] = difficulty_list[3]+1;
         //          break;
         //       case 5:
         //          difficulty_list[4] = difficulty_list[4]+1;
         //          break;
         //    }
         //    switch(recordValues[i].score)
         //    {
         //       case -1:
         //          sentiment_list[0] = sentiment_list[0]+1;
         //          break;
         //       case 0:
         //          sentiment_list[1] = sentiment_list[1]+1;
         //           break;
         //       case 1:
         //          sentiment_list[2] = sentiment_list[2]+1;
         //          break;
         //    }
         //  }
         // average_sentiment_score = sentiment_score/recordValues.length;
         // average_sentiment_score = average_sentiment_score.toFixed(2);
         // average_difficulty = average_difficulty/recordValues.length;
      }
      getRecords();
      return;
   }, [recordValues.length]);
      return (
        <div>
            <span class ="courseSummary-form-title">
               {Title}
            </span>
            <h6> {offeringName} ({sectionName}) taught by {instructorsFullName} in {term} </h6>
            <p> {courseDescription} </p>

         </div>
      );
}
export default CourseSummary;
