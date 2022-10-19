import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import CourseTable from "./CourseTable";
import { Pagination, PaginationItem } from "@material-ui/lab";


function SearchBar(props) {
  const [CourseTitle, setCourseTitle] = useState('');
  const [CourseNumber, setCourseNumber] = useState('');
  const [Credits, setCredits] = useState('');
  // const [InstructorsFullName, setInstructorsFullName] = useState('');
  const [Department, setDepartment] = useState('');
  const [datasource, setDatasource] = useState([]);
  const [pagination, setPagination] = useState({position: [0, 0],});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(5);

  // new onSubmit with mongodb

  const onSubmit = async (e )=> {

    // console.log(e)

    e.preventDefault();

    let url = '?page='+pageNumber

    if(CourseTitle !=''){
      url += "&CourseTitle="+CourseTitle
    }
    if(CourseNumber !=''){
      url += "&CourseNumber="+CourseNumber
    }
    if(Credits !=''){
      url += "&Credits="+Credits
    }
    // if(InstructorsFullName !=''){
    //   url += "&InstructorsFullName="+InstructorsFullName
    // }
    if(Department !=''){
      url += "&Department="+Department
    }

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

  }
  const onChange = e => {
    setDepartment(e)
  }


  return (
    <div>
    <div class="searchbar">
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
      {/* <Form.Item name="InstructorsFullName" label="Instructors">
        <Input
          placeholder="Instructors"
          onChange={e => setInstructorsFullName(e.target.value)}
          value={InstructorsFullName}
        />
      </Form.Item> */}

      <Form.Item name="Department" label="Department">
        <Select placeholder="Please Select" onChange={onChange} >
          <Select.Option value="">
            Please Selected
          </Select.Option>
          <Select.Option value="AS Agora Institute">
            AS Agora Institute
          </Select.Option>
          <Select.Option value="AS Anthropology">
            AS Anthropology
          </Select.Option>
          <Select.Option value="AS Archaeology">
            AS Archaeology
          </Select.Option>
          <Select.Option value="AS Art">
            AS Art
          </Select.Option>
          <Select.Option value="AS Behavioral Biology">
            AS Behavioral Biology
          </Select.Option>
          <Select.Option value="AS Biology">
            AS Biology
          </Select.Option>
          <Select.Option value="AS Biophysics">
            AS Biophysics
          </Select.Option>
          <Select.Option value="AS Center for Africana Studies">
            AS Center for Africana Studies
          </Select.Option>
          <Select.Option value="AS Center for Language Education">
            AS Center for Language Education
          </Select.Option>
          <Select.Option value="AS Chemistry">
            AS Chemistry
          </Select.Option>
          <Select.Option value="AS Classics">
            AS Classics
          </Select.Option>
          <Select.Option value="AS Cognitive Science">
            AS Cognitive Science
          </Select.Option>
          <Select.Option value="AS Comparative Thought and Literature">
            AS Comparative Thought and Literature
          </Select.Option>
          <Select.Option value="AS Dean's Teaching Fellowship Courses">
            AS Dean's Teaching Fellowship Courses
          </Select.Option>
          <Select.Option value="AS Earth & Planetary Sciences">
            AS Earth & Planetary Sciences
          </Select.Option>
          <Select.Option value="AS East Asian Studies">
            AS East Asian Studies
          </Select.Option>
          <Select.Option value="AS Economics">
            AS Economics
          </Select.Option>
          <Select.Option value="AS English">
            AS English
          </Select.Option>
          <Select.Option value="AS Film and Media Studies">
            AS Film and Media Studies
          </Select.Option>
          <Select.Option value="AS First Year Seminars">
            AS First Year Seminars
          </Select.Option>
          <Select.Option value="AS History">
            AS History
          </Select.Option>
          <Select.Option value="AS History of Art">
            AS History of Art
          </Select.Option>
          <Select.Option value="AS History of Science, Medicine, and Technology">
            AS History of Science, Medicine, and Technology
          </Select.Option>
          <Select.Option value="AS Interdepartmental">
            AS Interdepartmental
          </Select.Option>
          <Select.Option value="AS International Studies">
            AS International Studies
          </Select.Option>
          <Select.Option value="AS Islamic Studies">
            AS Islamic Studies
          </Select.Option>
          <Select.Option value="AS Jewish Studies Program">
            AS Jewish Studies Program
          </Select.Option>
          <Select.Option value="AS Mathematics">
            AS Mathematics
          </Select.Option>
          <Select.Option value="AS Medicine, Science and the Humanities">
            AS Medicine, Science and the Humanities
          </Select.Option>
          <Select.Option value="AS Military Science">
            AS Military Science
          </Select.Option>
          <Select.Option value="AS Modern Languages and Literatures">
            AS Modern Languages and Literatures
          </Select.Option>
          <Select.Option value="AS Music">
            AS Music
          </Select.Option>
          <Select.Option value="AS Near Eastern Studies">
            AS Near Eastern Studies
          </Select.Option>
          <Select.Option value="AS Neuroscience">
            AS Neuroscience
          </Select.Option>
          <Select.Option value="AS Philosophy">
            AS Philosophy
          </Select.Option>
          <Select.Option value="AS Physics & Astronomy">
            AS Physics & Astronomy
          </Select.Option>
          <Select.Option value="AS Political Science">
            AS Political Science
          </Select.Option>
          <Select.Option value="AS Program in Latin American Studies">
            AS Program in Latin American Studies
          </Select.Option>
          <Select.Option value="AS Program in Museums and Society">
            AS Program in Museums and Society
          </Select.Option>
          <Select.Option value="AS Psychological & Brain Sciences">
            AS Psychological & Brain Sciences
          </Select.Option>
          <Select.Option value="AS Public Health Studies">
            AS Public Health Studies
          </Select.Option>
          <Select.Option value="AS Reserved Registrar">
            AS Reserved Registrar
          </Select.Option>
          <Select.Option value="AS Sociology">
            AS Sociology
          </Select.Option>
          <Select.Option value="AS Study of Women, Gender, & Sexuality">
            AS Study of Women, Gender, & Sexuality
          </Select.Option>
          <Select.Option value="AS Theatre Arts & Studies">
            AS Theatre Arts & Studies
          </Select.Option>
          <Select.Option value="AS Writing Program">
            AS Writing Program
          </Select.Option>
          <Select.Option value="AS Writing Seminars">
            AS Writing Seminars
          </Select.Option>
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
          <Select.Option value="EN Environmental Health and Engineering">
            EN Environmental Health and Engineering
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
          <Select.Option value="EN Materials Science & Engineering">
            EN Materials Science & Engineering
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
    </div>

    <CourseTable pagination={pagination} data={datasource}/>

    </div>
  );
}


export default SearchBar;
