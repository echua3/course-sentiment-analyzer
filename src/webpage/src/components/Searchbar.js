import React from "react";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseTable from "./CourseTable";


function SearchBar(props) {
  const [CourseTitle, setCourseTitle] = useState('');
  const [CourseNumber, setCourseNumber] = useState('');
  const [Credits, setCredits] = useState('');
  const [Department, setDepartment] = useState('');
  const [datasource, setDatasource]=useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(5);

  // new onSubmit with mongodb

  const onSubmit = async (e )=> {

    console.log(e)

    e.preventDefault();

    let url = '?page='+pageNumber

    console.log('CourseTitle')

    if(CourseTitle !=''){
      url += "&CourseTitle="+CourseTitle
    }
    if(CourseNumber !=''){
      url += "&CourseNumber="+CourseNumber
    }
    if(Credits !=''){
      url += "&Credits="+Credits
    }
    if(Department !=''){
      url += "&Department="+Department
    }




    console.log(url)

    // axios.get("http://localhost:3000/courselist/" + CourseTitle + "/" +
    //  CourseNumber + "/" +
    //   Credits + "/" +
    //    Department + "/" +
    //     pageNumber)
    axios.get("http://localhost:5000/api/courselist" + url)
      .then((res) => {
        console.log('res')
        console.log(res.data)
        if (res.status === 200) {
          setDatasource('');
          setDatasource(res.data.data)
          // message.success("Login succeed! ");
        }
      })
      .catch((err) => {
        console.log("failed: ", err.message);
      });

  }


  return (

    <div>
    <Form onSubmit={onSubmit}>
    {/* <Form onFinish={props.onFinish}> */}
      <Form.Item name="CourseTitle" label="Course Title">
        <Input
          placeholder="course title"
          onChange={e => setCourseTitle(e.target.value)}
          value={CourseTitle}
        />
      </Form.Item>
      <Form.Item name="CourseNumber" label="Course Number">
        <Input
          placeholder="course number"
          onChange={e => setCourseNumber(e.target.value)}
          value={CourseNumber}
        />
      </Form.Item>
      <Form.Item name="Credits" label="Credits">
        <Input
          placeholder="credits"
          onChange={e => setCredits(e.target.value)}
          value={Credits}
        />
      </Form.Item>
      <Form.Item name="Department" label="Department">
        <Input
          placeholder="department"
          onChange={e => setDepartment(e.target.value)}
          value={Department}
        />
      </Form.Item>
      <Form.Item>

        <Button type="primary" htmlType="submit" onClick={onSubmit}>Submit</Button>
      </Form.Item>
    </Form>

    <CourseTable data={datasource}/>
    </div>
  );
}


export default SearchBar;
