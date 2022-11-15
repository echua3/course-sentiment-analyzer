import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState,useEffect} from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";
function getStars(par1)
{
   var star = "";
   var stars = "⭐";
   var result;

   for(let i=0; i<Number(par1); i++)
   {
      result = star.concat(stars);
     
   }
   return result;

}
var sentiment_score = 0;
var average_difficulty=0;
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
          for(let i=0; i<recordValues.length; i++)
          {
            sentiment_score = sentiment_score +recordValues[i].score;
            average_difficulty=average_difficulty+recordValues[i].difficulty;
            
          }
         average_sentiment_score = sentiment_score/recordValues.length;
         average_difficulty = average_difficulty/recordValues.length;

          console.log("Average is " + average_sentiment_score);
          console.log("Difficulty is " + average_difficulty);
          
          
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
    <Col span={18} push={6}>
    <span class="courseSummary-form-title">
               {Title}
         </span>
    </Col>

    <Col span={6} pull={18}>
    <span class="writereview-form-title">
         
      {}  {getStars(average_difficulty)}
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

       </div>
    );
}
export default CourseSummary;
