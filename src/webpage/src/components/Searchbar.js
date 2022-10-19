import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
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

    // console.log(e)

    e.preventDefault();

    let url = '?page='+pageNumber

    // console.log('CourseTitle')

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

    // console.log(url)

    axios.get("http://localhost:5000/api/courselist" + url)
      .then((res) => {
        if (res.status === 200) {
          setDatasource('');
          setDatasource(res.data.data)
          // message.success("Login succeed! ");
        }
      })
      .catch((err) => {
        console.log("failed: ", err.message);
      });

    // setCourseTitle('');
    // setCourseNumber('');
    // setCredits('');
    // setDepartment('');
    // setDatasource('');
  }
  const onChange = e => {
    // console.log("hello")
    // console.log(e)
    // console.log(e.target)
    // console.log(e.target.value)

    setDepartment(e)

  }


  return (

    <div>
    <Form onSubmit={onSubmit}>
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
        <Select placeholder="Please Select" onChange={onChange} >
          <Select.Option value="EN Applied Mathematics & Statistics">
            EN Applied Mathematics & Statistics
          </Select.Option>
          <Select.Option value="EN Biomedical Engineering">
            EN Biomedical Engineering
          </Select.Option>
          <Select.Option value="EN Center for Leadership Education">
            EN Center for Leadership Education
          </Select.Option>
          <Select.Option value="EN Chemical & Biomolecular Engineering">
            EN Chemical & Biomolecular Engineering
          </Select.Option>
          <Select.Option value="EN Civil and Systems Engineering">
            EN Civil and Systems Engineering
          </Select.Option>
          <Select.Option value="EN Civil Engineering">
            EN Civil Engineering
          </Select.Option>
          <Select.Option value="EN Computer Science">
            EN Computer Science
          </Select.Option>
          <Select.Option value="EN Doctor of Engineering">
            EN Doctor of Engineering
          </Select.Option>
          <Select.Option value="EN Electrical & Computer Engineering">
            EN Electrical & Computer Engineering
          </Select.Option>
          <Select.Option value="EN Engineering Management">
            EN Engineering Management
          </Select.Option>
          <Select.Option value="EN First Year Seminars">
            EN First Year Seminars
          </Select.Option>
          <Select.Option value="EN General Engineering">
            EN General Engineering
          </Select.Option>
          <Select.Option value="EN Information Security Institute">
            EN Information Security Institute
          </Select.Option>
          <Select.Option value="EN Institute for NanoBio Technology">
            EN Institute for NanoBio Technology
          </Select.Option>
          <Select.Option value="EN Mechanical Engineering">
            EN Mechanical Engineering
          </Select.Option>
          <Select.Option value="EN Reserved Registrar">
            EN Reserved Registrar
          </Select.Option>
          <Select.Option value="EN Robotics">
            EN Robotics
          </Select.Option>
        </Select>
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
