import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState,useEffect} from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";
import DifficultyPieChart from './DifficultyPieChart.js';
import SentimentPieChart from './SentimentPieChart.js';
var difficulty_list = new Array(5).fill(0);
var sentiment_list = new Array(3).fill(0);
export{difficulty_list};
export{sentiment_list};
// function returnDifficultList()
// {
//    return difficulty_list;
// }
function getStars(par1)
{
   var star = "Difficulty: ";
   var stars = "⭐";
   var result;
   for(let i=0; i<Number(par1); i++)
   {
      result = star.concat(stars);
   }
   return result;
}
var sentiment_score = 0;
var average_difficulty = 0;
var average_sentiment_score;
function CourseSummary({record}) {
    const [Title, setTitle] = useState({record}.record.Title);
    const [Prereq, setPrereq] = useState({record}.record.SectionRegRestrictions);
    const instructorsFullName = {record}.record.InstructorsFullName
    const [recordValues, setRecords] = useState([]);
    const offeringName = {record}.record.OfferingName
    const sectionName = {record}.record.SectionName
    const term = {record}.record.Term
    // const description = {record}.record.SectionDetails.Description
    useEffect( () => {
      async function getRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID)
          if(!response.ok) {
            const message = "An error occured"
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setRecords(records.data);
          sentiment_score = 0;
          average_difficulty=0;
          difficulty_list.fill(0);
          sentiment_list.fill(0);
          for(let i=0; i<recordValues.length; i++)
          {
            sentiment_score = sentiment_score +recordValues[i].score;
            average_difficulty=average_difficulty+recordValues[i].difficulty;
            switch(recordValues[i].difficulty)
            {
               case 1:
                  difficulty_list[0] = difficulty_list[0]+1;
                  break;
               case 2:
                   difficulty_list[1] = difficulty_list[1]+1;
                   break;
               case 3:
                  difficulty_list[2] = difficulty_list[2]+1;
                  break;
               case 4:
                  difficulty_list[3] = difficulty_list[3]+1;
                  break;
               case 5:
                  difficulty_list[4] = difficulty_list[4]+1;
                  break;
            }
            switch(recordValues[i].score)
            {
               case -1:
                  sentiment_list[0] = sentiment_list[0]+1;
                  break;
               case 0:
                  sentiment_list[1] = sentiment_list[1]+1;
                   break;
               case 1:
                  sentiment_list[2] = sentiment_list[2]+1;
                  break;
            }
          }
         average_sentiment_score = sentiment_score/recordValues.length;
         average_difficulty = average_difficulty/recordValues.length;
          console.log("Average is " + average_sentiment_score);
          console.log("Difficulty is " + average_difficulty);
          console.log("Difficulty list"+difficulty_list);
         //  console.log("Average is " + average_sentiment_score);
         //  console.log("Difficulty is " + average_difficulty);
         // console.log(recordValues[0].score);
         // console.log(recordValues[1].score);
         // console.log(recordValues[2].score);
      }
      getRecords();
      return;
  }, [recordValues.length]);
    return (
        <div>
            <Row>
    <Col span={16} push={8}>
    <span class="courseSummary-form-stars">
    {getStars(average_difficulty)}
         </span>
    </Col>
    <Col span={8} pull={16}>
    <span class="writereview-form-title">
         {Title}
    </span>
    <p>
      Average Sentiment
      {average_sentiment_score}
    </p>
      
    </Col>
  </Row>
     <h6>
        {offeringName} ({sectionName}) taught by {instructorsFullName} in {term}
     </h6>
     <p>
        Add desc. manually or bypass (no description data from API)
     </p>
     <Row>
      <Col span={18} push={12}>
      <SentimentPieChart/>
       Review Sentiment
      </Col>
      <Col span={6} pull={12}>
      <DifficultyPieChart/>
         Difficulty
         </Col>
     </Row>
   </div>
    );
}
export default CourseSummary;