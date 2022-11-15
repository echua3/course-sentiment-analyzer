import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, message, Alert } from "antd";
import axios from "axios";
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
        startLoading(0);
        setLoading(true);
        await fetch(API_ENDPOINT + "/user/" + "af3").then(async(response) => {
        if (!response.ok) {
            const message = "An error occured"
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

          const interests = await fetch(API_ENDPOINT + "/recs/" + "?firstInterest=" + first + "&secondInterest=" + second + "&thirdInterest=" + third + "&department=" + records.data[0].department);
          if(!interests.ok) {
              const message = "An error occured"
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

  if(isLoading) {
    return (
    <div class='recommendationsPage'>
        <Button class='writereview-form-btn' type="primary" htmlType="submit" loading={loadings[0]}></Button>
    </div>
  );
  } else {
    return (
        <div class='recommendationsPage'>
            <text>
                Your course recommendations are listed below! Please make sure to keep your interests up to date in your profile for accurate recommendations!
            </text>
            <CourseTable data={datasource}/>  
        </div>
      );
  }
  
}


export default RecommendationsTable;