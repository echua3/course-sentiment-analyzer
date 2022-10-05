import "./index.css";
import "./components/Searchbar";
import SearchBar from "./components/Searchbar";

import axios from "axios";

import { message, Table } from "antd";
import React, { useState } from "react";


function App() {
  const [datasource,setDatasource]=useState([])
  const columns=[
    {
      title: 'School Name',
      dataIndex: 'SchoolName',
      key: 'SchoolName',
    },
    {
      title: 'Offering Name',
      dataIndex: 'OfferingName',
      key: 'OfferingName',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Credits',
      dataIndex: 'Credits',
      key: 'Credits',
    },
    {
      title: 'Instructors',
      dataIndex: 'Instructors',
      key: 'Instructors',
    },
  ]
  function onSubmit(values){
    const { CourseTitle, courseID } = values;
    //
    const opt = {
      method: "GET",
      params:{CourseTitle,courseID},
      url: `/api/classes?key=9N7pYLkUVHSf8xzgFWMK5Cv7jnmQAzFo`,
    };
    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setDatasource(res.data)
          // message.success("Login succeed! ");
        }
      })
      .catch((err) => {
        console.log("failed: ", err.message);
      });
}
  return (
    <div className="App">
      <SearchBar  onFinish={onSubmit}/>
      <Table dataSource={datasource} columns={columns}/>
    </div>
  );
}
export default App;
