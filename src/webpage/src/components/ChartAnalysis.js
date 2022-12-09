import React from "react";
import { useState,useEffect} from "react";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";
import { Button } from "antd";
import DifficultyPieChart from './DifficultyPieChart.js';
import SentimentPieChart from './SentimentPieChart.js';
var difficulty_list = new Array(5).fill(0);
var sentiment_list = new Array(3).fill(0);
// export{difficulty_list};
// export{sentiment_list};

function getStars(par1) {
   var star = "Difficulty : ";
   var stars = "⭐";
   var result="";
   if(isNaN(par1)) {
      result = "N/A";
   }
   else {
      for(let i=0; i<Math.round(par1); i++)
      {
         //console.log('Value of i is:'+i)
         result = result.concat(stars);
         //console.log('Stars is'+result)
      }  
   }
   result = star.concat(result)
   return result;
}

function getEmoji(par2){
   var happy = "😁";
   var sad = "😭";
   var neutral = "😐";
   var nodata = "N/A";
   if (par2>0){
      return happy;  
   }
   else if (par2<0){
      return sad;
   }
   else if (par2==0){
      return neutral;
   }
   else {
      return nodata;
   }

}
var sentiment_score = 0;
var average_difficulty = 0;
var average_sentiment_score;
function ChartAnalysis({record}) {
    const [Title, setTitle] = useState({record}.record.Title);
    const [recordValues, setRecords] = useState([]);
    const [loadings, setLoadings] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect( () => {
      async function getRecords() {
         // const delay = ms => new Promise(
         //    resolve => setTimeout(resolve, ms)
         //  );
          startLoading(0);
          setLoading(true);
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID)
          if(!response.ok) {
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
            console.log('diffilist ',difficulty_list)
            if(recordValues[i].score<=-1){
               sentiment_list[0] = sentiment_list[0]+1;
            }
            else if(recordValues[i].score==0){
               sentiment_list[1] = sentiment_list[1]+1;
            }
            else{
               sentiment_list[2] = sentiment_list[2]+1;
            }
            console.log('sentilist ',sentiment_list)
          }
         average_sentiment_score = (sentiment_list[0]*(-1)+sentiment_list[2]);
         console.log('avg senti score ',average_sentiment_score)
         average_difficulty = average_difficulty/recordValues.length;
         // await delay(500);
         endLoading(0);
         setLoading(false);
      }
      getRecords();
      return;
   }, [recordValues.length]);

   const startLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
    }
  
    const endLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }
  
  
      return isLoading ? (
      <div class='charts-loading'>
          <span class="writereview-form-title">
            Your Charts are being analyzed!
          </span>
          <Button style={{ backgroundColor: "#a7caed", borderColor: "#a7caed" }} loading={loadings[0]}></Button>
      </div>
      ) : (
         <div>

         <Row>
            <Col xs={24} sm={24} xl={12}>
            <span class ="courseSummary-form-title">
            {Title}
         </span>
            </Col>
            <Col xs={24} sm={24} xl={12}>
               <span class="courseSummary-form-stars">
                  {getStars(average_difficulty)}
               </span>
               {/* <p class="courseSummary-form-sentiment"> Average Sentiment: {!isNaN(average_sentiment_score) ? average_sentiment_score : 'N/A'} </p> */}
               <p class="courseSummary-form-sentiment"> Average Sentiment: {getEmoji(average_sentiment_score)} </p>
            </Col>
         </Row>
       
         <Row justify="center">
            <Col xs={24} sm={11} lg={8}>
               <DifficultyPieChart difficulty_list={difficulty_list}/>
            </Col>
            <Col xs={24} sm={11} lg={8}>
               <SentimentPieChart sentiment_list={sentiment_list}/>
            </Col>
         </Row>
      </div>
   );
  }

export default ChartAnalysis;
