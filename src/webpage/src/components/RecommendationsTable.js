import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, message, Alert } from "antd";
import axios from "axios";
import CourseTable from "./CourseTable";
import "./style/css/CourseComponent.scss"


function RecommendationsTable(props) {

  const changePage = async (currentPage)=>{

    params.currentPage = currentPage
    let test={...params,currentPage}
    setParams(test)
    await requestData(params)

  }

  // new onSubmit with mongodb

  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [pagination, setPagination] = useState({onChange:changePage, showSizeChanger:false});
  const [loadings, setLoadings] = useState([]);
  const [user, setUser] = useState("");
  const [params, setParams] = useState({
    CourseTitle: '',
    CourseNumber: '',
    Credits:'',
    Department:'',
    currentPage:1,
  })


  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const requestData= async (params)=>{
    // edited for development and deployment usage
    await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/courselist", {params})
    .then((res) => {
      if (res.status === 200) {
        setDatasource('')
        pagination.total = 0
        pagination.current = params.currentPage
        let test={...pagination}
        setPagination(test)

        if (res.data.code == 400) {
          if (res.data.msg=="Credits need to be numbers!") {
            message.error(res.data.msg)
          } else if (res.data.msg=="The format of the Course Number is incorrect") {
            message.error(res.data.msg)
          }
          pagination.total = 0
          pagination.current = params.currentPage
          let test={...pagination}
          setPagination(test)
        } else if(res.data.code==200){
          if (res.data.numberTotal==0) {
            message.info("No course found!");
          } else{
            setDatasource(res.data.data)
            // console.log(pagination)
            pagination.total = res.data.numberTotal
            pagination.current = params.currentPage
            // console.log(pagination)
            let test={...pagination}
            setPagination(test)
          }
        }
      }
    })
    .catch((err) => {
      console.log("failed: ", err.message);
    });
  }

  useEffect( () => {
    async function getRecords() {
        await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + "jy6").then(async(response) => {
        if (!response.ok) {
            const message = "An error occured"
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setUser(records.data[0]);
  
          //console.log(records.data[0].department)
          const interests = await fetch(process.env.REACT_APP_API_ENDPOINT + "/recs/" + "?firstInterest=" + records.data[0].firstInterest + "&secondInterest=" + records.data[0].secondInterest + "&thirdInterest=" + records.data[0].thirdInterest + "&department=" + records.data[0].department);
          if(!interests.ok) {
              const message = "An error occured"
              console.log("Error:" + interests.statusText);
              return;
          }
          const recommendations = await interests.json();
          console.log(recommendations);
        
        })
       
    }
    getRecords();
    
    return;
  }, []);

  return (
    <div class='recommendationsPage'>
      <CourseTable pagination={{...pagination,onChange:changePage}} data={datasource}/>
    </div>
  );
}


export default RecommendationsTable;