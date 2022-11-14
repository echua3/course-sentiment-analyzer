import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, message, Alert } from "antd";
import axios from "axios";
import CourseTable from "./CourseTable";
import "./style/css/CourseComponent.scss"


function RecommendationsTable(props) {

  const [datasource, setDatasource] = useState([]);
  const [user, setUser] = useState("");

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect( () => {
    async function getRecords() {
        await fetch(API_ENDPOINT + "/user/" + "jy6").then(async(response) => {
        if (!response.ok) {
            const message = "An error occured"
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setUser(records.data[0]);
          
          const interests = await fetch(API_ENDPOINT + "/recs/" + "?firstInterest=" + records.data[0].firstInterest + "&secondInterest=" + records.data[0].secondInterest + "&thirdInterest=" + records.data[0].thirdInterest + "&department=" + records.data[0].department);
          if(!interests.ok) {
              const message = "An error occured"
              console.log("Error:" + interests.statusText);
              return;
          }
          //setDatasource(interests);
          const recommendations = await interests.json();
          console.log(recommendations);
          //setDatasource(recommendations);
        })
       
    }
    getRecords();
    
    return;
  }, []);

  return (
    <div class='recommendationsPage'>
        Your course recommendations are listed below! Please make sure to keep your interests up to date in your profile for accurate recommendations!
      <CourseTable data={datasource}/>
    </div>
  );
}


export default RecommendationsTable;