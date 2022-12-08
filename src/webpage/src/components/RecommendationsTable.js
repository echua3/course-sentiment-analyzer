import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CourseTable from "./CourseTable";
import "./style/css/CourseComponent.scss"


function RecommendationsTable(props) {

  const [datasource, setDatasource] = useState([]);
  const [user, setUser] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  useEffect( () => {
    async function getRecords() {
        const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
            if(!responseValue.ok) {
                    console.log("Error:" + responseValue.statusText);
                    window.userID = "";
                    return;
        }
        const records2 = await responseValue.json();
        console.log(records2.data.userId);
        window.userID = records2.data.userId
        startLoading(0);
        setLoading(true);
        await fetch(API_ENDPOINT + "/user/" + records2.data.userId).then(async(response) => {
        if (!response.ok) {
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setUser(records.data[0]);

          let first = "*";
          let second = "*";
          let third = "*";

          if (records.data[0].firstInterest != "") {
            first = records.data[0].firstInterest;
          }
          if (records.data[0].secondInterest != "") {
            second = records.data[0].secondInterest;
          }
          if (records.data[0].thirdInterest != "") {
            third = records.data[0].thirdInterest;
          }

          const interests = await fetch(API_ENDPOINT + "/recs/" + "?firstInterest=" + first + "&secondInterest=" + second + "&thirdInterest=" + third + "&department=" + records.data[0].department + "&degreeType=" + records.data[0].degreeType);
          if(!interests.ok) {
              console.log("Error:" + interests.statusText);
              return;
          }
          const recommendations = await interests.json();
          console.log(recommendations.data);
          setDatasource(recommendations.data);
        })
        endLoading(0);
        setLoading(false);
    }
    getRecords();
    
    return;
  }, []);

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
    <div class='recommendations-form-title'>
        <span class="writereview-form-title">
          Your course recommendations are listed below! Please make sure to keep your interests up to date in your profile for accurate recommendations!
        </span>
        <Button style={{ backgroundColor: "#a7caed", borderColor: "#a7caed" }} loading={loadings[0]}></Button>
    </div>
    ) : (
        <div class='recommendations-form-title'>
          <span class="writereview-form-title">
            Your course recommendations are listed below! Please make sure to keep your interests up to date in your profile for accurate recommendations!
          </span>
          <CourseTable data={datasource}/>  
        </div>
      );  
}


export default RecommendationsTable;
